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

创建 `.env` 文件并配置你的 API Key：

```bash
# 使用 Qwen (推荐)
ANTHROPIC_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
ANTHROPIC_API_KEY=你的_API_Key
ANTHROPIC_MODEL=qwen3.5-plus

# 或使用 Claude API
# ANTHROPIC_API_KEY=你的_API_Key
# ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
```

获取 API Key：[阿里云 DashScope](https://dashscope.console.aliyun.com/)

### 5. 运行

```bash
# 开发模式
bun run dev

# 或使用 .env 配置
bun run --env-file=.env main.tsx
```

### 6. 安装为全局命令

#### Windows

```powershell
# 创建批处理文件
New-Item -ItemType File -Path "$env:USERPROFILE\bin\vibecode.cmd" -Force
Set-Content -Path "$env:USERPROFILE\bin\vibecode.cmd" -Value '@echo off
bun run --env-file="%~dp0..\vibecode\.env" "%~dp0..\vibecode\main.tsx" %*'

# 添加到 PATH
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";$env:USERPROFILE\bin", "User")
```

#### macOS / Linux

```bash
# 创建启动脚本
mkdir -p ~/.local/bin
cat > ~/.local/bin/vibecode << 'EOF'
#!/bin/bash
cd /path/to/vibecode
bun run --env-file=.env main.tsx "$@"
EOF
chmod +x ~/.local/bin/vibecode

# 确保 ~/.local/bin 在 PATH 中
export PATH="$HOME/.local/bin:$PATH"
```

安装完成后，可以在任意目录使用：
```bash
vibecode
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

## 构建提示词

### 提示词 1：全局重构指南

```
# Role & Context
你现在是一位顶级的 AI 架构师和资深 Node.js/CLI 开发者。我们正在进行一个名为 **"VibeCode"** 的逆向工程与重构项目。
目标代码库来源于一个复杂的企业级 AI 终端工具（包含大量内部耦合）。你的任务是剔除其中的商业冗余、企业级鉴权和遥测代码，将其提纯并魔改为一个轻量级、开源友好、支持本地配置的独立 AI 编程助手。

# 核心任务指南 (Execution Steps)

## 1. 全局品牌重塑 (Rebranding & Initialization)
- 扫描全局代码，将所有的 `claude-code`、`claude` 等专属命名空间、全局变量名、以及 CLI 入口命令，全部安全替换为 `VibeCode` 和 `vibecode`。
- 梳理并重新生成一份纯净的 `package.json`。补齐缺失的开源依赖（如 ink, zod, commander 等），清理无法获取的内部包引用。

## 2. 剥离"企业级"毒瘤 (Strip Enterprise Bloat)
- **彻底切除遥测 (Telemetry)**：定位并物理删除所有与用户行为打点、错误上报、内部数据收集相关的代码块及函数调用。
- **移除功能开关 (Feature Flags)**：清理所有依赖云端下发的 A/B 测试或实验性功能开关逻辑，直接将核心且稳定的功能硬编码为 `true`（默认开启）。
- **解耦冗余鉴权 (SSO/Auth)**：砍掉所有与浏览器重定向、企业内部 SSO 登录相关的复杂逻辑。

## 3. 重塑大模型通信层 (Refactor Network & API)
- 建立极简的本地化配置中心。编写逻辑让应用在初始化时，优先从用户本地目录（如 `~/.vibecode/.env`）读取 `ANTHROPIC_API_KEY` 或第三方中转 API 的 Key。
- 拦截所有发往原企业内部网关的 Fetch/Axios 请求。将其重定向到标准的公开 API 端点（支持配置 Base URL 以适配中转代理），并确保鉴权 Headers 和 `computer-use` 等 Beta 请求头配置正确。

## 4. 保留"核心灵魂" (Preserve the Core Agent)
- **绝对禁止**大幅修改核心的 System Prompt（系统提示词）逻辑和 Agent 状态机（State Machine）的事件循环。
- 完整保留并修复 `Bash`、`Text Editor` 和 `Computer Use` 等 Tool 的注册、参数校验和本地沙箱执行机制。
- 保持原有的终端 UI 渲染逻辑（如基于 React/ink 的进度条和 Markdown 输出）。

# 执行要求 (Rules of Engagement)
1. 步步为营：不要试图一次性输出所有代码。请严格按照上述 1 到 4 的顺序，分布执行。
2. 遇坑搭桥：如果遇到深度耦合且缺失的内部工具类（如找不到的 utils），请不要报错中断，直接用标准的开源库方案（如原生 JS, lodash, fs-extra）编写 Mock/Polyfill 平替函数。
3. 如果你理解了当前任务，请先简要复述你的执行策略，然后直接输出【步骤1】的全局修改计划和你需要执行的终端命令。
```

### 提示词 2：Buddy 系统魔改指南

```
# Role & Context
你现在是一位资深的 Node.js 逆向工程师和 CLI 架构师。我正在 Windows 环境下开发 `VibeCode` CLI（基于近期泄露的 Claude Code 源码重构）。
当前任务：完全剥离原有的企业级构建依赖，修复环境报错，并将隐藏的 `/buddy` 电子宠物系统魔改为"Pokemon（宝可梦）"主题。

# 核心约束 (Strict Rules)
1. 绝对不要修改或破坏核心的 LLM 对话逻辑和 Tool Calling 机制。
2. 遇到缺失的内部模块，优先使用 Mock 或现有开源替代品，保持程序不崩溃。
3. 严格按照以下 4 个步骤顺序执行，每完成一步请简要汇报，再进行下一步。

---

## 第一步：环境模拟与启动绕过 (Windows 适配)
目标：解决 `bun:bundle` 缺失导致的入口点阻塞和功能开关报错。
1. **创建全局 Mock**：在 `src/globals.ts` 中定义全局环境变量。模拟 `bun:bundle`，定义全局 `feature` 函数（当传入参数为 `'BUDDY'` 时必须返回 `true`）。同时定义全局 `VERSION` 变量。
2. **强制激活入口**：修改 `src/main.tsx`，在文件顶部最先引入 `globals.ts`。梳理 `main()` 函数的调用逻辑，移除环境监测拦截，确保即使没有官方 bundle 环境也能直接启动应用。
3. **注册 CLI 命令**：在 `src/main.tsx` 中注册 `buddy` 子命令（使用 `ink` 渲染 UI）。同步修改 `src/commands.ts`，导出 `buddy` 命令，确保它可以在交互式 REPL 环境中作为斜杠命令 `/buddy` 被调用。

## 第二步：Pokemon 核心定义与模块修复
目标：在不破坏 TypeScript 类型系统的前提下，注入宝可梦物种。
1. **更新类型导出 (`src/buddy/types.ts`)**：
   - 新增 Pokemon 种类（如 Pikachu, Charmander, Squirtle, Gengar, Snorlax 等）。
   - **关键**：必须保留旧有的 `ghost`, `axolotl`, `chonk` 等常量导出，以维持现有代码的类型兼容性。
   - 补全并调整新物种的 `RARITY_WEIGHTS`（稀有度权重）配置。
2. **重构精灵映射 (`src/buddy/sprites.ts`)**：
   - 将新定义的 Pokemon 种类导入，并映射到最接近的 ASCII 身体模型（例如：Pikachu 映射到原版的 `chonk` 身体，Charmander 映射到 `dragon`，Gengar 映射到 `ghost`）。
   - 更新 `renderFace` 等渲染函数，确保包含并兼容所有新物种的面部逻辑。

## 第三步：强行开启功能开关 (全局覆盖)
目标：物理切断所有对 `bun:bundle` 的依赖导入。
1. 全局搜索并在以下文件中，注释或安全移除 `import { feature } from 'bun:bundle'` 语句：
   - `src/commands.ts`
   - `src/screens/REPL.tsx`
   - `src/buddy/CompanionSprite.tsx`
   - `src/components/PromptInput/PromptInput.tsx`
   - `src/utils/attachments.ts`
2. 确保这些文件在移除导入后，能够隐式或显式地回退使用我们在第一步定义的全局 `feature` Mock 函数。

## 第四步：实现 TUI 孵化与状态面板
目标：打造极具仪式感的终端用户体验。
在 `src/commands/buddy/buddy.tsx` 中实现以下 React/Ink 组件逻辑：
1. **PokeBall 孵化动画**：使用 `useEffect` 编写一个定时器状态机，展示"精灵球晃动 -> 裂开 -> 孵化成功"的 ASCII 动画过渡效果。
2. **状态持久化**：孵化成功后，根据 User ID (或本地唯一标识) 生成固定的 Pokemon，并持久化其状态（饥饿度、快乐值等）。
3. **Stats 属性面板**：使用 `ink` 的 `Box` 和 `Text` 组件，排版展示精美的宠物各项数值面板和专属的性格描述文本（例如：性格：傲娇、状态：带电）。
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
