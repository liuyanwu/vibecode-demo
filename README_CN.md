# Vibecode - 中文使用指南

> 基于 Claude Code 源码的 AI 编程助手

---

## 项目简介

Vibecode 是一个基于 Claude Code 源码的社区分支版本，支持多种 AI 模型（包括 Qwen、Claude 等），提供终端内的智能编程辅助功能。

### 主要特性

- 🤖 **多模型支持** - 支持 Qwen、Claude 等多种大语言模型
- 🛠️ **丰富工具集** - 文件操作、代码搜索、Shell 命令执行、Web 搜索等
- 💻 **终端 UI** - 基于 Ink 的 React 终端渲染引擎
- 📝 **代码编辑** - 智能文件读写、代码重构、Diff 展示
- 🔌 **MCP 支持** - Model Context Protocol 扩展能力
- 🧠 **Agent 系统** - 子代理任务并行执行
- 🎯 **权限控制** - 细粒度的工具执行权限管理
- 🔄 **持久化记忆** - 跨会话的记忆和上下文保持

---

## 系统要求

### 必需依赖

| 依赖 | 版本 | 说明 |
|------|------|------|
| [Bun](https://bun.sh/) | 最新版 | JavaScript 运行时和包管理器 |
| Node.js | 18+ | 部分脚本需要 |

### 可选依赖

| 依赖 | 说明 |
|------|------|
| Git | 代码版本控制 |
| PowerShell | Windows 下的高级脚本支持 |

---

## 快速开始

### 1. 安装 Bun

```bash
# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# Windows
powershell -c "irm bun.sh/install.ps1 | iex"
```

### 2. 克隆项目

```bash
git clone <repository-url>
cd vibecode
```

### 3. 安装依赖

```bash
bun install
```

### 4. 配置 API

#### 使用 Qwen (推荐)

创建 `.env` 文件：

```bash
# Qwen API 配置
ANTHROPIC_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
ANTHROPIC_API_KEY=sk-your-qwen-api-key-here
ANTHROPIC_MODEL=qwen3.5-plus
```

获取 API Key：[阿里云 DashScope](https://dashscope.console.aliyun.com/)

#### 使用 Claude API

```bash
ANTHROPIC_API_KEY=sk-ant-your-claude-api-key
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
```

### 5. 运行

```bash
# 使用 Qwen
bun run dev:qwen

# 或使用 .env 配置
bun run --env-file=.env main.tsx
```

---

## 项目结构

```
vibecode/
├── main.tsx              # 应用入口
├── commands.ts           # 命令注册
├── tools/                # 工具实现
│   ├── BashTool/         # Shell 命令执行
│   ├── FileReadTool/     # 文件读取
│   ├── FileEditTool/     # 文件编辑
│   ├── AgentTool/        # 子代理
│   └── ...
├── components/           # UI 组件
├── utils/                # 工具函数
├── services/             # 服务层
│   ├── api/              # API 客户端
│   ├── mcp/              # MCP 服务
│   └── lsp/              # LSP 服务
├── commands/             # 斜杠命令
├── skills/               # 技能系统
├── plugins/              # 插件系统
└── vim/                  # Vim 模式
```

---

## 可用命令

### 常用斜杠命令

| 命令 | 说明 |
|------|------|
| `/help` | 显示帮助信息 |
| `/compact` | 压缩对话上下文 |
| `/cost` | 显示 Token 使用情况 |
| `/diff` | 显示最近的代码更改 |
| `/plan` | 进入规划模式 |
| `/review` | 代码审查 |
| `/memory` | 管理持久化记忆 |
| `/vim` | 切换 Vim 模式 |
| `/theme` | 切换主题 |
| `/config` | 配置设置 |

---

## 依赖列表

### 核心依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| `@anthropic-ai/sdk` | ^0.32.0 | Anthropic Claude API 客户端 |
| `@modelcontextprotocol/sdk` | ^1.29.0 | Model Context Protocol |
| `ink` | ^5.0.0 | React 终端渲染 |
| `react` | ^19.3.0-canary | UI 框架 |
| `react-reconciler` | ^0.33.0 | React 协调器 |
| `zod` | ^3.23.0 | 数据验证 |
| `chalk` | ^5.3.0 | 终端颜色 |
| `diff` | ^8.0.4 | Diff 算法 |
| `fuse.js` | ^7.1.0 | 模糊搜索 |
| `marked` | ^17.0.5 | Markdown 解析 |
| `lodash-es` | ^4.17.21 | 工具函数库 |
| `axios` | ^1.7.0 | HTTP 客户端 |
| `ws` | ^8.18.0 | WebSocket |
| `uuid` | ^10.0.0 | UUID 生成 |
| `semver` | ^7.7.4 | 语义化版本 |

### 开发依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| `typescript` | ^5.5.0 | TypeScript 编译器 |
| `@types/react` | ^18.3.0 | React 类型定义 |
| `@types/bun` | latest | Bun 类型定义 |
| `@types/node` | ^20.0.0 | Node.js 类型定义 |

---

## 与 Claude Code 的功能差距

### 1. 品牌与身份

| 方面 | Claude Code (官方) | Vibecode (此项目) |
|------|-------------------|-------------------|
| 产品名称 | Claude Code | Vibecode |
| 开发公司 | Anthropic | 社区/第三方 |
| 系统提示词 | "You are Claude Code..." | 可自定义 |

### 2. API 与模型支持

| 功能 | Claude Code | Vibecode |
|------|-------------|----------|
| 默认 API | Anthropic Claude API | 支持 Qwen、Claude 等 |
| 模型选择 | Claude 系列 | Qwen、Claude 等 |

### 3. 功能对比

#### ✅ 已具备的核心功能
- **工具系统** - Bash、文件读写、Glob、Grep、Agent、Web 搜索等
- **终端 UI** - 基于 Ink 的 React 终端渲染
- **命令系统** - 80+ 斜杠命令
- **权限系统** - 工具执行权限控制
- **Agent 系统** - 子代理任务执行
- **MCP 支持** - Model Context Protocol
- **LSP 集成** - 语言服务器协议
- **持久化内存** - 跨会话记忆
- **插件系统** - 扩展功能
- **Vim 模式** - 完整 Vim 模拟

#### ⚠️ 可能受限的功能
- **Analytics/Telemetry** - 官方遥测系统
- **OAuth 认证** - 官方账户集成
- **自动更新** - 官方更新通道
- **团队/企业功能** - 多用户协作

---

## 配置说明

### 环境变量

| 变量 | 说明 | 示例 |
|------|------|------|
| `ANTHROPIC_API_KEY` | API 密钥 | `sk-xxx` |
| `ANTHROPIC_BASE_URL` | API 基础 URL | `https://dashscope.aliyuncs.com/compatible-mode/v1` |
| `ANTHROPIC_MODEL` | 主模型 | `qwen3.5-plus` |
| `CLAUDE_CONFIG_DIR` | 配置目录 | `~/.claude` |

### 可用模型

**Qwen 系列：**
- `qwen3.5-plus` - Qwen 3.5 Plus（推荐）
- `qwen-max` - Qwen Max
- `qwen-plus` - Qwen Plus

**Claude 系列：**
- `claude-3-5-sonnet-20241022`
- `claude-3-opus-20240229`
- `claude-3-haiku-20240307`

---

## 故障排除

### 问题：API 请求失败

1. 检查 API Key 是否正确
2. 确认 API Key 有足够的额度
3. 检查网络连接

### 问题：依赖安装失败

```bash
# 清除缓存重新安装
rm -rf node_modules bun.lock
bun install
```

### 问题：运行时报错

```bash
# 确保使用正确的环境变量
bun run --env-file=.env main.tsx
```

---

## 开发指南

### 运行开发模式

```bash
bun run dev
```

### 构建

```bash
# 项目使用 Bun 直接运行 TypeScript，无需构建
```

### 测试

```bash
# 运行测试（如有）
bun test
```

---

## 许可证

本项目基于 Claude Code 源码，仅供学习、研究和安全分析使用。

**注意：** 请遵守 Anthropic 的知识产权，不要将本代码用于商业目的或构建竞争产品。

---

## 致谢

- 原始代码：[Anthropic Claude Code](https://www.anthropic.com/claude-code)
- 泄露发现者：[Chaofan Shou (@Fried_rice)](https://twitter.com/Fried_rice)
- 运行时：[Bun](https://bun.sh/)
- UI 框架：[Ink](https://github.com/vadimdemedes/ink)
