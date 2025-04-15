# MCP Rule Server

A Model Context Protocol (MCP) server for managing Cursor editor rules. This server analyzes user requirements and generates appropriate rule files to enhance the coding experience in Cursor editor.

## Features

- Analyze user technology stack requirements
- Match and recommend appropriate rules
- Create properly configured rule files
- Support for interactive and automatic modes

## Installation

### Via npx (Recommended)

MCP Rule Server can be run directly using npx without global installation:

```bash
npx mcp-rule-server
```

Supported parameters:

```bash
npx mcp-rule-server --rules-dir /path/to/rules/directory --target-dir /path/to/output/directory --threshold 0.8
```

#### Parameter Description

- `--rules-dir /path/to/rules`: Specify rules directory (default: `./dist/rules`)
- `--target-dir /path/to/output`: Specify target output directory (default: `./.cursor/rules`)
- `--threshold 0.8`: Set confidence threshold for rule matching (default: 0.7)

### Local Installation (Optional)

1. Clone the repository:

   ```bash
   git clone https://github.com/tjh19971228/rules_mcp.git
   cd rules_mcp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## MCP Configuration Guide

To integrate this MCP server with tools that support the MCP protocol, refer to the following configuration methods:

### Claude for Desktop Configuration

To configure MCP server in Claude for Desktop:

1. Open Claude for Desktop configuration file:

```bash
# Windows
code %AppData%\Claude\claude_desktop_config.json

# macOS
code ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Linux
code ~/.config/Claude/claude_desktop_config.json
```

2. Add the following MCP configuration:

```json
{
  "mcps": {
    "rules-manager": {
      "command": "node",
      "args": ["/path/to/rules_mcp/dist/index.js", "--rules-dir", "/path/to/rules_mcp/dist/rules"],
      "cwd": "/path/to/rules_mcp/dist"
    }
  }
}
```

### Cursor Editor Configuration

To configure MCP server in Cursor editor:

1. Open Cursor settings

2. Add MCP configuration:

```json
{
  "mcp.services": {
    "rules-manager": {
      "command": "node",
      "args": ["/path/to/rules_mcp/dist/index.js", "--rules-dir", "/path/to/rules_mcp/dist/rules"],
      "cwd": "/path/to/rules_mcp/dist"
    }
  }
}
```

### OpenAI Plugin Configuration

To configure this MCP server as an OpenAI plugin:

1. Create an `openai-plugin.json` file:

```json
{
  "schema_version": "v1",
  "name_for_human": "Cursor Rules Manager",
  "name_for_model": "cursor_rules_manager",
  "description_for_human": "Manage and create rule files for Cursor editor",
  "description_for_model": "Analyze user requirements and generate Cursor editor rules via MCP protocol",
  "auth": {
    "type": "none"
  },
  "api": {
    "type": "mcp",
    "url": "http://localhost:your-port/mcp"
  },
  "logo_url": "https://your-domain/logo.png",
  "contact_email": "your-email@example.com",
  "legal_info_url": "https://your-domain/terms"
}
```

2. Start the MCP server and ensure it's available on the specified port

## License

This project is licensed under the MIT License - see the LICENSE file for details
