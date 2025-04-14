import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";
import path from 'path';
import { MCPConfig, WorkMode } from './types';
import { RuleManager } from './ruleManager';
import { z } from 'zod';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Process command line arguments
const args = process.argv.slice(2);
const workMode = args.includes('--auto') ? WorkMode.Automatic : WorkMode.Interactive;
const confidenceThreshold = parseFloat(getArgValue(args, '--threshold') || '0.7');
const rulesDirectory = getArgValue(args, '--rules-dir') || path.join(process.cwd(), 'dist', 'rules');
const targetDirectory = getArgValue(args, '--target-dir') || path.join(process.cwd(), '.cursor', 'rules');

// Configure MCP service
const config: MCPConfig = {
  rulesDirectory,
  targetDirectory,
  confidenceThreshold,
  workMode
};

try {
  // Initialize the MCP server
  const server = new McpServer({
    name: "Cursor Rules Manager",
    version: "1.0.0"
  });

  // Create rule manager
  const ruleManager = new RuleManager(config.rulesDirectory);

  // Register capabilities - moved here from MCPService class
  registerCapabilities(server, ruleManager, config);

  // Connect to stdio transport
  const transport = new StdioServerTransport();
  server.connect(transport);

  console.log('MCP service started successfully');

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\nService shutting down...');
    process.exit(0);
  });

  process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    process.exit(1);
  });
} catch (error) {
  console.error('Failed to start MCP service:', error);
  process.exit(1);
}

/**
 * Register all MCP server capabilities
 */
function registerCapabilities(server: McpServer, ruleManager: RuleManager, config: MCPConfig): void {
  // Resource - Get available rules list
  server.resource(
    "rules",
    "rules://available",
    async (uri) => {
      try {
        const files = fs.readdirSync(config.rulesDirectory)
          .filter((file: string) => file.endsWith('.md'))
          .map((file: string) => path.basename(file, '.md'));

        return {
          contents: [{
            uri: uri.href,
            text: JSON.stringify(files, null, 2)
          }]
        };
      } catch (error) {
        console.error('Failed to get rules list:', error);
        return {
          contents: [{
            uri: uri.href,
            text: JSON.stringify({ error: "Failed to get rules list" }, null, 2)
          }]
        };
      }
    }
  );

  // Tool - Analyze user request
  server.tool(
    "analyze_request",
    "Analyze user's tech stack requirements and match with rules",
    {
      userInput: z.string().describe("User's project requirement description, e.g.: 'Next.js+tailwind+shadcn/ui project'")
    },
    async (args: { userInput?: string }) => {
      try {
        if (!args.userInput) {
          throw new Error("userInput is required");
        }

        // Analyze user input
        const request = ruleManager.analyzeRequest(args.userInput);

        // Match rules
        const matchResult = ruleManager.matchRules(request);

        // Format rule preview
        const preview = ruleManager.formatRulePreview(matchResult);

        return {
          content: [{
            type: "text",
            text: JSON.stringify({ preview })
          }]
        };
      } catch (err) {
        const error = err as Error;
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ error: error.message })
          }],
          isError: true
        };
      }
    }
  );

  // Tool - Create rule file
  server.tool(
    "create_rule",
    "Create a rule file with the specified name and content",
    {
      confirmed: z.preprocess(
        (val) => {
          if (typeof val === 'string') {
            if (val.toLowerCase() === 'true') return true;
            if (val.toLowerCase() === 'false') return false;
          }
          return val; // Pass through other types (including boolean) for validation
        },
        z.boolean().describe("Whether to confirm rule creation")
      ),
      ruleContent: z.string().describe("Rule file content"),
      targetDirectory: z.string().optional().describe("Target directory path"),
      ruleName: z.string().optional().describe("Name of the rule to use for the file name")
    },
    async (args: { confirmed?: boolean; targetDirectory?: string; ruleContent?: string; ruleName?: string }) => {
      try {
        if (args.confirmed === undefined) {
          throw new Error("confirmed parameter is required");
        }

        if (!args.ruleContent) {
          throw new Error("ruleContent parameter is required");
        }

        if (!args.confirmed) {
          return {
            content: [{
              type: "text",
              text: JSON.stringify({ message: "Rule creation cancelled" })
            }]
          };
        }

        // Create the rule file with the specified name
        const ruleName = args.ruleName || "custom-rule";

        try {
          // Create the rule file in the target directory
          const targetDir = args.targetDirectory || config.targetDirectory;
          const rulePath = ruleManager.createRule(targetDir, args.ruleContent, ruleName);

          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: true,
                ruleName: ruleName,
                rulePath: rulePath,
                markdownContent: args.ruleContent,
                contentType: "markdown",
                message: `Successfully created rule file: ${rulePath}`
              })
            }]
          };
        } catch (err) {
          const error = err as Error;
          console.error('Failed to create rule file:', error);

          return {
            content: [{
              type: "text",
              text: JSON.stringify({
                success: false,
                ruleName: ruleName,
                markdownContent: args.ruleContent,
                contentType: "markdown",
                error: `Failed to create rule file: ${error.message}`,
                message: `Failed to create rule file. Here is the markdown content for rule: ${ruleName}`
              })
            }]
          };
        }
      } catch (err) {
        const error = err as Error;
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ error: error.message })
          }],
          isError: true
        };
      }
    }
  );

  // Tool - Process user request and find matching rule
  server.tool(
    "process_request",
    "Process user request, find matching rule, and provide save options",
    {
      userInput: z.string().describe("User's project requirement description")
    },
    async (args: { userInput?: string }) => {
      try {
        if (!args.userInput) {
          throw new Error("userInput is required");
        }

        // Analyze user input
        const request = ruleManager.analyzeRequest(args.userInput);

        // Match rules
        const matchResult = ruleManager.matchRules(request);

        // Format rule preview
        const preview = ruleManager.formatRulePreview(matchResult);

        // Check if this is a high-confidence match
        const isHighConfidenceMatch = matchResult.confidence >= config.confidenceThreshold;

        let response: any = { preview };

        if (matchResult.matchedRules.length > 0) {
          // Get the best matched rule name
          const bestMatchedRule = matchResult.matchedRules[0].rule;

          // Add metadata to the response
          response.ruleName = bestMatchedRule.name;
          response.confidence = matchResult.confidence;

          // Add a simple message
          const confidenceMsg = isHighConfidenceMatch ? 'High confidence match' : 'Low confidence match';
          response.message = `${confidenceMsg}: Found rule '${bestMatchedRule.name}'.`;

          // Include the markdown content in the response
          response.markdownContent = matchResult.suggestedRule;

          // Add a special marker to indicate this is markdown content
          response.contentType = "markdown";

          // Add instructions for the client with explicit save action
          response.instructions = "The following content is in Markdown format. To save this rule, use the create_rule tool with the following parameters:";

          // Add save action details
          response.saveAction = {
            tool: "create_rule",
            params: {
              confirmed: true,
              ruleName: bestMatchedRule.name,
              ruleContent: matchResult.suggestedRule
            }
          };

          // Add explicit save prompt
          response.savePrompt = `Would you like me to save this as a rule file in your project? If so, I can create a file named ${bestMatchedRule.name}.md in the target directory.`;

          // Return the response as JSON
          return {
            content: [{
              type: "text",
              text: JSON.stringify(response)
            }]
          };
        }

        return {
          content: [{
            type: "text",
            text: JSON.stringify(response)
          }]
        };
      } catch (err) {
        const error = err as Error;
        return {
          content: [{
            type: "text",
            text: JSON.stringify({ error: error.message })
          }],
          isError: true
        };
      }
    }
  );
}

/**
 * Get value for specified argument from command line args
 */
function getArgValue(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  if (index !== -1 && index + 1 < args.length) {
    return args[index + 1];
  }
  return undefined;
}

/**
 * Usage examples:
 *
 * Interactive mode (default):
 * npm start
 *
 * Automatic mode:
 * npm start -- --auto
 *
 * Custom confidence threshold:
 * npm start -- --threshold 0.8
 *
 * Specify rules directory (default is dist/rules):
 * npm start -- --rules-dir ./custom-rules
 *
 * Specify target directory:
 * npm start -- --target-dir /path/to/project
 */
