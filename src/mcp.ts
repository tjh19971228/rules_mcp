/**
 * MCP Utilities for Cursor Rules Manager
 * 
 * This file contains utility functions for working with MCP in the context
 * of Cursor rules management. The main implementation is now in index.ts.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { RuleManager } from './ruleManager';
import { MCPConfig } from './types';

/**
 * Validates the server configuration
 * 
 * @param config The MCP configuration to validate
 * @returns Object with validation result and any errors
 */
export function validateConfig(config: MCPConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check rules directory
  if (!config.rulesDirectory) {
    errors.push('Rules directory must be specified');
  }

  // Check target directory
  if (!config.targetDirectory) {
    errors.push('Target directory must be specified');
  }

  // Check confidence threshold
  if (config.confidenceThreshold < 0 || config.confidenceThreshold > 1) {
    errors.push('Confidence threshold must be between 0 and 1');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Creates a formatted error response for MCP
 * 
 * @param message The error message
 * @param details Optional error details
 * @returns Formatted MCP error response
 */
export function createErrorResponse(message: string, details?: any) {
  return {
    content: [{
      type: "text",
      text: JSON.stringify({
        error: message,
        details: details || {}
      })
    }],
    isError: true
  };
}

/**
 * Creates a successful response for MCP
 * 
 * @param data The response data
 * @returns Formatted MCP success response
 */
export function createSuccessResponse(data: any) {
  return {
    content: [{
      type: "text",
      text: JSON.stringify(data)
    }]
  };
}

/**
 * Helper function to handle MCP tool errors consistently
 * 
 * @param error The error that occurred
 * @returns Formatted MCP error response
 */
export function handleToolError(error: unknown) {
  const errorMessage = error instanceof Error 
    ? error.message 
    : 'Unknown error occurred';
  
  return createErrorResponse(errorMessage, {
    stack: error instanceof Error ? error.stack : undefined
  });
}
