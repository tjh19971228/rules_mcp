/**
 * Test client for Cursor Rules Manager MCP Server
 * 
 * This client sends test requests to the MCP server to verify functionality
 * 
 * Usage:
 * 1. npm run build (first build the server)
 * 2. node simple-test.js analyze "Create a Next.js+tailwind+shadcn/ui project"
 * 3. node simple-test.js create "# Test Rule\nThis is a test rule"
 * 4. node simple-test.js process "Create a React+TypeScript project"
 */

const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');
const path = require('path');

// Get absolute path to the built server
const serverPath = path.resolve(__dirname, './dist/index.js');

// Parse command line arguments
const action = process.argv[2];
const input = process.argv[3];

if (!action || !input) {
  console.error('Usage: node simple-test.js [analyze|create|process] "input text"');
  process.exit(1);
}

async function main() {
  try {
    console.log('Connecting to MCP server...');
    
    // Create MCP client
    const transport = new StdioClientTransport({
      command: process.execPath, // Node.js executable
      args: [serverPath]
    });
    
    const client = new Client({
      name: 'mcp-test-client',
      version: '1.0.0'
    });
    
    // Connect to server
    client.connect(transport);
    
    console.log('Connected successfully');
    
    // List available tools
    const toolsResult = await client.listTools();
    console.log('Available tools:', toolsResult.tools.map(t => t.name));
    
    // Handle different actions
    let result;
    switch (action) {
      case 'analyze':
        console.log('Sending analyze request...');
        result = await client.callTool('analyze_request', { userInput: input });
        break;
      
      case 'create':
        console.log('Sending create rule request...');
        result = await client.callTool('create_rule', { 
          confirmed: true,
          ruleContent: input,
          targetDirectory: './test-output'
        });
        break;
      
      case 'process':
        console.log('Sending process request...');
        result = await client.callTool('process_request', { userInput: input });
        break;
      
      default:
        console.error('Unknown action:', action);
        console.error('Available actions: analyze, create, process');
        process.exit(1);
    }
    
    console.log('Response:');
    console.log(JSON.parse(result.content[0].text));
    
    // Close the client
    await client.close();
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main().catch(console.error); 