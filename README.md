# Cursor Rules Manager MCP Server

A Model Context Protocol (MCP) server for managing Cursor editor rules. This server analyzes user requirements and generates appropriate rule files to enhance the coding experience in Cursor.

## Features

- Analyze user requests for technology stacks
- Match and recommend appropriate rules from a rule library
- Create rule files with proper configurations
- Support for interactive and automatic modes

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/cursor-rules-manager.git
   cd cursor-rules-manager
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## Usage

### Starting the Server

```bash
# Interactive mode (default)
npm start

# Automatic mode
npm start -- --auto

# Custom confidence threshold
npm start -- --threshold 0.8

# Specify rules directory (default is dist/rules)
npm start -- --rules-dir ./custom-rules

# Specify target directory
npm start -- --target-dir /path/to/project
```

### Configuring with Claude for Desktop

To use this MCP server with Claude for Desktop, you need to add it to the Claude configuration:

1. Open your Claude for Desktop App configuration:

```powershell
# Windows
code $env:AppData\Claude\claude_desktop_config.json
```

### MCP configuration

    "rules-manager": {
      "command":"node",
      "args":["F:\\workspace\\cursor_rules\\dist\\index.js --rules-dir F:\\workspace\\cursor_rules\\dist\\rules "],
      "cwd":"F:\\workspace\\cursor_rules\\dist"
    }
