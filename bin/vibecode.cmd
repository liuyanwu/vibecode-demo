@echo off
REM VibeCode Windows 启动脚本
setlocal

REM 查找脚本所在目录
set "SCRIPT_DIR=%~dp0"
set "PROJECT_DIR=%SCRIPT_DIR%.. "

REM 检查是否有 .env 文件
if exist "%PROJECT_DIR%.env" (
    set "ENV_FLAG=--env-file=.env"
) else (
    set "ENV_FLAG="
)

REM 启动 Bun
cd /d "%PROJECT_DIR%"
bun run %ENV_FLAG% main.tsx %*

endlocal
