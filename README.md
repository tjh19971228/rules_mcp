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

## MCP 配置指南

要将此 MCP 服务器与支持 MCP 协议的不同工具集成，请参考以下配置方法：

### Claude for Desktop 配置

在 Claude for Desktop 中配置 MCP 服务器：

1. 打开 Claude for Desktop 配置文件：

```powershell
# Windows
code $env:AppData\Claude\claude_desktop_config.json

# macOS
code ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Linux
code ~/.config/Claude/claude_desktop_config.json
```

2. 在配置文件中添加以下 MCP 配置（根据您的实际路径调整）：

```json
{
  "mcps": {
    "rules-manager": {
      "command": "node",
      "args": ["路径/到/mcp-rule-server/dist/index.js --rules-dir 路径/到/mcp-rule-server/dist/rules"],
      "cwd": "路径/到/mcp-rule-server/dist"
    }
  }
}
```

### Cursor 编辑器配置

在 Cursor 编辑器中配置 MCP 服务器：

1. 打开 Cursor 的设置

2. 添加 MCP 配置：

```json
{
  "mcp.services": {
    "rules-manager": {
      "command": "node",
      "args": ["路径/到/mcp-rule-server/dist/index.js"],
      "cwd": "路径/到/mcp-rule-server/dist"
    }
  }
}
```

### OpenAI 插件配置

如果要将此 MCP 服务器配置为 OpenAI 插件：

1. 创建一个 `openai-plugin.json` 文件：

```json
{
  "schema_version": "v1",
  "name_for_human": "Cursor Rules Manager",
  "name_for_model": "cursor_rules_manager",
  "description_for_human": "管理和创建 Cursor 编辑器的规则文件",
  "description_for_model": "通过 MCP 协议分析用户需求并生成 Cursor 编辑器规则",
  "auth": {
    "type": "none"
  },
  "api": {
    "type": "mcp",
    "url": "http://localhost:你的端口/mcp"
  },
  "logo_url": "https://你的域名/logo.png",
  "contact_email": "你的邮箱@example.com",
  "legal_info_url": "https://你的域名/terms"
}
```

2. 启动 MCP 服务器，并确保其在指定端口上可用

## 通过 npx 使用

MCP Rule Server 现在支持通过 npx 直接运行，无需全局安装：

```bash
npx mcp-rule-server
```

您也可以传递参数：

```bash
npx mcp-rule-server --auto --threshold=0.8 --rules-dir=./custom-rules
```

### 支持的参数

- `--auto`：启用自动模式
- `--threshold=<value>`：设置规则匹配的置信度阈值（默认：0.7）
- `--rules-dir=<path>`：指定规则文件目录（默认：`./dist/rules`）
- `--target-dir=<path>`：指定目标输出目录（默认：`./.cursor/rules`）

### 在 AI 助手工具中使用

如果您正在使用支持 MCP 的 AI 助手工具，可以通过以下方式配置：

```json
{
  "mcps": {
    "rules-manager": {
      "command": "npx",
      "args": ["mcp-rule-server", "--auto"],
      "cwd": "您的工作目录"
    }
  }
}
```

## 贡献指南

欢迎为本项目贡献代码和提出建议：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参阅 LICENSE 文件
