# Qwen 3.5 Plus 快速启动脚本
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Qwen 3.5 Plus 配置工具" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "请访问：https://dashscope.console.aliyun.com/" -ForegroundColor Yellow
Write-Host "获取你的 API Key" -ForegroundColor Yellow
Write-Host ""
$apiKey = Read-Host "输入你的 API Key (sk-开头)"
Write-Host ""
Write-Host "正在配置..." -ForegroundColor Green

$envContent = @"
ANTHROPIC_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
ANTHROPIC_API_KEY=$apiKey
ANTHROPIC_MODEL=qwen3.5-plus
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host "配置已保存到 .env 文件" -ForegroundColor Green
Write-Host ""
Write-Host "测试配置..." -ForegroundColor Cyan

& bun -e "console.log('API URL:', process.env.ANTHROPIC_BASE_URL); console.log('Model:', process.env.ANTHROPIC_MODEL);" --env-file=.env

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "配置完成！" -ForegroundColor Green
Write-Host "运行以下命令启动：" -ForegroundColor Yellow
Write-Host "  bun run dev:qwen" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
