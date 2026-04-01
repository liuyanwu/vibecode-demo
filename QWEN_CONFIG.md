# Qwen 3.5 Plus 配置指南

## 快速开始

### 1. 获取 API Key

访问 [阿里云 DashScope](https://dashscope.console.aliyun.com/) 获取你的 API Key。

### 2. 配置环境变量

#### 方法一：使用 .env 文件（推荐）

编辑项目根目录的 `.env` 文件：

```bash
# Qwen API 配置
ANTHROPIC_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
ANTHROPIC_API_KEY=sk-your-qwen-api-key-here
ANTHROPIC_MODEL=qwen3.5-plus
```

#### 方法二：命令行设置

**Windows PowerShell:**
```powershell
$env:ANTHROPIC_BASE_URL="https://dashscope.aliyuncs.com/compatible-mode/v1"
$env:ANTHROPIC_API_KEY="sk-your-qwen-api-key-here"
$env:ANTHROPIC_MODEL="qwen3.5-plus"
bun run main.tsx
```

**Windows CMD:**
```cmd
set ANTHROPIC_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
set ANTHROPIC_API_KEY=sk-your-qwen-api-key-here
set ANTHROPIC_MODEL=qwen3.5-plus
bun run main.tsx
```

**Linux/Mac:**
```bash
export ANTHROPIC_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
export ANTHROPIC_API_KEY=sk-your-qwen-api-key-here
export ANTHROPIC_MODEL=qwen3.5-plus
bun run main.tsx
```

### 3. 运行

使用配置好的环境变量运行：

```bash
# 使用 .env 文件
bun run dev:qwen

# 或者手动指定
bun run --env-file=.env main.tsx
```

## 配置选项说明

| 环境变量 | 说明 | 示例值 |
|---------|------|--------|
| `ANTHROPIC_BASE_URL` | API 基础 URL | `https://dashscope.aliyuncs.com/compatible-mode/v1` |
| `ANTHROPIC_API_KEY` | 你的 API Key | `sk-xxxxxxxxxxxx` |
| `ANTHROPIC_MODEL` | 主模型 | `qwen3.5-plus` |
| `ANTHROPIC_SMALL_FAST_MODEL` | 快速模型（可选） | `qwen3.5-plus` |

## 可用模型

Qwen 提供的模型包括：

- `qwen3.5-plus` - Qwen 3.5 Plus（推荐）
- `qwen-max` - Qwen Max
- `qwen-plus` - Qwen Plus

## 测试配置

运行以下命令测试配置是否正确：

```bash
bun run --env-file=.env -e "console.log('API URL:', process.env.ANTHROPIC_BASE_URL); console.log('Model:', process.env.ANTHROPIC_MODEL);"
```

## 故障排除

### 问题：API 请求失败

1. 检查 API Key 是否正确
2. 确认 API Key 有足够的额度
3. 检查网络连接

### 问题：模型不可用

1. 确认模型名称正确
2. 检查 DashScope 控制台确认模型可用

### 问题：响应格式错误

Qwen API 使用与 Anthropic 兼容的格式，但某些高级功能可能不兼容。

## 费用说明

请访问 [阿里云 DashScope 定价页面](https://www.aliyun.com/product/dashscope/pricing) 了解最新的价格信息。
