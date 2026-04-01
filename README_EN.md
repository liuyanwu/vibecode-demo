# Vibecode

[![中文](https://img.shields.io/badge/中文-切换-red)](./README.md)

> An AI-powered coding assistant based on Claude Code, with a built-in Pikachu companion

---

## Overview

Vibecode is a community fork of Claude Code, supporting multiple AI models (Qwen, Claude, etc.) with an intelligent coding assistant running in your terminal.

### Features

- 🤖 **Multi-Model Support** - Qwen, Claude, and more
- 🛠️ **Rich Toolset** - File operations, code search, shell execution, web search
- 💻 **Terminal UI** - React-based terminal rendering with Ink
- 📝 **Smart Editing** - Intelligent file I/O, code refactoring, diff display
- 🔌 **MCP Support** - Model Context Protocol extensions
- 🧠 **Agent System** - Parallel sub-agent task execution
- 🎯 **Permission Control** - Fine-grained tool execution permissions
- 🔄 **Persistent Memory** - Cross-session context retention
- ⚡ **Buddy System** - Built-in Pikachu companion for coding fun

### Preview

![Buddy System Screenshot](./docs/images/buddy-screenshot.png)

> Summon your Pikachu companion with `/buddy` command!

---

## System Requirements

### Required

| Dependency | Version | Description |
|------------|---------|-------------|
| [Bun](https://bun.sh/) | Latest | JavaScript runtime & package manager |
| Node.js | 18+ | For some scripts |

### Optional

| Dependency | Description |
|------------|-------------|
| Git | Version control |
| PowerShell | Advanced scripting on Windows |

---

## Quick Start

### 1. Install Bun

```bash
# macOS/Linux
curl -fsSL https://bun.sh/install | bash


# Windows
powershell -c "irm bun.sh/install.ps1 | iex"
```


### 2. Clone Repository

```bash
git clone <repository-url>
cd vibecode
```

### 3. Install Dependencies

```bash
bun install
```

### 4. Configure API

**⚠️ You must configure API Key before use!**

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Edit `.env` and add your API Key:

```bash
# Using Qwen (Recommended)
ANTHROPIC_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
ANTHROPIC_API_KEY=your_api_key
ANTHROPIC_MODEL=qwen3.5-plus

# Or use Claude API
# ANTHROPIC_API_KEY=your_api_key
# ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
```

Get API Key: [Alibaba Cloud DashScope](https://dashscope.console.aliyun.com/)

> **Note**: `.env` contains sensitive data and is in `.gitignore`, won't be committed.

### 5. Run


```bash
# Development mode
bun run dev

# Or with env file
bun run --env-file=.env main.tsx
```

### 6. Install Globally

#### Windows

```powershell
# Create batch file
New-Item -ItemType File -Path "$env:USERPROFILE\bin\vibecode.cmd" -Force
Set-Content -Path "$env:USERPROFILE\bin\vibecode.cmd" -Value '@echo off
bun run --env-file="%~dp0..\vibecode\.env" "%~dp0..\vibecode\main.tsx" %*'

# Add to PATH
[Environment]::SetEnvironmentVariable("Path", $env:USERPROFILE + "\bin;" + $env:Path, "User")
```

#### macOS / Linux

```bash
# Create launch script
mkdir -p ~/.local/bin
cat > ~/.local/bin/vibecode << 'EOF'
#!/bin/bash
cd /path/to/vibecode
bun run --env-file=.env main.tsx "$@"
EOF
chmod +x ~/.local/bin/vibecode

# Ensure ~/.local/bin is in PATH
export PATH="$HOME/.local/bin:$PATH"
```

After installation, use anywhere:
```bash
vibecode
```

---

## Project Structure

```
vibecode/
├── main.tsx              # Entry point
├── commands.ts           # Command registry
├── tools/                # Tool implementations
│   ├── BashTool/         # Shell execution
│   ├── FileReadTool/     # File reading
│   ├── FileEditTool/       # File editing
│   ├── AgentTool/        # Sub-agents
│   └── ...
├── components/           # UI components
├── utils/                # Utilities
├── services/             # Services
│   ├── api/              # API clients
│   ├── mcp/              # MCP services
│   └── lsp/              # LSP services
├── commands/             # Slash commands
├── skills/               # Skill system
├── hooks/                # React hooks
├── constants/            # Constants
├── types/                # TypeScript types
└── buddy/                # Buddy system
    ├── buddyState.ts
    └── pikachuSprites.ts
```

---

## Commands

### Built-in Commands

| Command | Description |
|---------|-------------|
| `/buddy` | Open Buddy system |
| `/buddy pet` | Pet your Pikachu |
| `/buddy feed` | Feed your Pikachu |
| `/buddy play` | Play with Pikachu |
| `/buddy sleep` | Let Pikachu sleep |
| `/buddy wake` | Wake up Pikachu |
| `/buddy status` | Check Buddy status |

### Development Commands

```bash
# Start development
bun run dev

# Start with env
bun run --env-file=.env main.tsx
```

---

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | API Key | - |
| `ANTHROPIC_BASE_URL` | API Base URL | - |
| `ANTHROPIC_MODEL` | Model name | `claude-3-5-sonnet-20241022` |

---

## Tech Stack

- **Runtime**: Bun / Node.js
- **Language**: TypeScript
- **UI**: React + Ink (Terminal UI)
- **AI**: Claude API / Qwen API
- **Build**: Bun

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## License

MIT License - see [LICENSE](./LICENSE) file

---

## Acknowledgments

- Based on [Claude Code](https://claude.ai/code)
- Thanks to the open source community

---

## Social Media

Follow me for updates:

- **抖音**: [@刘Vibe](https://www.douyin.com/)
- **小红书**: [@刘Vibe](https://www.xiaohongshu.com/)

---

<p align="center">
  Made with ⚡ by Vibecode Team
</p>
