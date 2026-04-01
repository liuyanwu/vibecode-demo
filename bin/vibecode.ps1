#!/usr/bin/env pwsh
# VibeCode PowerShell 启动脚本

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Resolve-Path "$ScriptDir\.."

# 检查是否有 .env 文件
$EnvFile = "$ProjectDir\.env"
$EnvFlag = ""
if (Test-Path $EnvFile) {
    $EnvFlag = "--env-file=.env"
}

# 切换到项目目录
Set-Location $ProjectDir

# 启动 Bun
$Args = @("run")
if ($EnvFlag) {
    $Args += $EnvFlag
}
$Args += @("main.tsx") + $args

& bun $Args
