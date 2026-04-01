@echo off
echo ========================================
echo   Qwen 3.5 Plus 配置工具
echo ========================================
echo.
echo 请访问：https://dashscope.console.aliyun.com/
echo 获取你的 API Key
echo.
set /p API_KEY="输入你的 API Key (sk-开头): "
echo.
echo 正在配置...
echo.

(
echo ANTHROPIC_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
echo ANTHROPIC_API_KEY=%API_KEY%
echo ANTHROPIC_MODEL=qwen3.5-plus
) > .env

echo 配置已保存到 .env 文件
echo.
echo 测试配置...
bun -e "console.log('API URL:', process.env.ANTHROPIC_BASE_URL); console.log('Model:', process.env.ANTHROPIC_MODEL);" --env-file=.env
echo.
echo ========================================
echo 配置完成！
echo 运行以下命令启动：
echo   bun run dev:qwen
echo ========================================
pause
