# VibeCode 环境变量重命名脚本 - 第二部分
# 处理遗漏的 CLAUDE_CODE_ 环境变量

$ErrorActionPreference = "Stop"

# 定义需要替换的环境变量映射（补充第一部分遗漏的）
$envVarMappings = @{
    # 测试相关
    'CLAUDE_CODE_TEST_FIXTURES_ROOT' = 'VIBECODE_TEST_FIXTURES_ROOT'
    'CLAUDE_CODE_IS_COWORK' = 'VIBECODE_IS_COWORK'
    'CLAUDE_CODE_EAGER_FLUSH' = 'VIBECODE_EAGER_FLUSH'
    'CLAUDE_CODE_DONT_INHERIT_ENV' = 'VIBECODE_DONT_INHERIT_ENV'
    
    # 会话相关
    'CLAUDE_CODE_SESSION_KIND' = 'VIBECODE_SESSION_KIND'
    'CLAUDE_CODE_SESSION_NAME' = 'VIBECODE_SESSION_NAME'
    'CLAUDE_CODE_SESSION_LOG' = 'VIBECODE_SESSION_LOG'
    'CLAUDE_CODE_AGENT' = 'VIBECODE_AGENT'
    'CLAUDE_CODE_COWORK' = 'VIBECODE_COWORK'
    
    # 功能开关
    'CLAUDE_CODE_DISABLE_ATTACHMENTS' = 'VIBECODE_DISABLE_ATTACHMENTS'
    'CLAUDE_CODE_ENABLE_TOKEN_USAGE_ATTACHMENT' = 'VIBECODE_ENABLE_TOKEN_USAGE_ATTACHMENT'
    'CLAUDE_CODE_TERMINAL_RECORDING' = 'VIBECODE_TERMINAL_RECORDING'
    'CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD' = 'VIBECODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD'
    'CLAUDE_CODE_DISABLE_1M_CONTEXT' = 'VIBECODE_DISABLE_1M_CONTEXT'
    'CLAUDE_CODE_MAX_CONTEXT_TOKENS' = 'VIBECODE_MAX_CONTEXT_TOKENS'
    'CLAUDE_CODE_EMIT_TOOL_USE_SUMMARIES' = 'VIBECODE_EMIT_TOOL_USE_SUMMARIES'
    'CLAUDE_CODE_DISABLE_FAST_MODE' = 'VIBECODE_DISABLE_FAST_MODE'
    'CLAUDE_CODE_ALWAYS_ENABLE_EFFORT' = 'VIBECODE_ALWAYS_ENABLE_EFFORT'
    'CLAUDE_CODE_EFFORT_LEVEL' = 'VIBECODE_EFFORT_LEVEL'
    'CLAUDE_CODE_HOST_PLATFORM' = 'VIBECODE_HOST_PLATFORM'
    'CLAUDE_CODE_NO_FLICKER' = 'VIBECODE_NO_FLICKER'
    'CLAUDE_CODE_DISABLE_MOUSE' = 'VIBECODE_DISABLE_MOUSE'
    'CLAUDE_CODE_DISABLE_MOUSE_CLICKS' = 'VIBECODE_DISABLE_MOUSE_CLICKS'
    'CLAUDE_CODE_BASE_REF' = 'VIBECODE_BASE_REF'
    'CLAUDE_CODE_DISABLE_FILE_CHECKPOINTING' = 'VIBECODE_DISABLE_FILE_CHECKPOINTING'
    'CLAUDE_CODE_ENABLE_SDK_FILE_CHECKPOINTING' = 'VIBECODE_ENABLE_SDK_FILE_CHECKPOINTING'
    'CLAUDE_CODE_MCP_SERVER_NAME' = 'VIBECODE_MCP_SERVER_NAME'
    'CLAUDE_CODE_MCP_SERVER_URL' = 'VIBECODE_MCP_SERVER_URL'
    'CLAUDE_CODE_ENABLE_CFC' = 'VIBECODE_ENABLE_CFC'
    'CLAUDE_CODE_DEBUG_LOG_LEVEL' = 'VIBECODE_DEBUG_LOG_LEVEL'
    'CLAUDE_CODE_DEBUG_LOGS_DIR' = 'VIBECODE_DEBUG_LOGS_DIR'
    'CLAUDE_CODE_DIAGNOSTICS_FILE' = 'VIBECODE_DIAGNOSTICS_FILE'
    'CLAUDE_CODE_GLOB_NO_IGNORE' = 'VIBECODE_GLOB_NO_IGNORE'
    'CLAUDE_CODE_GLOB_HIDDEN' = 'VIBECODE_GLOB_HIDDEN'
    'CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS' = 'VIBECODE_DISABLE_GIT_INSTRUCTIONS'
    'CLAUDE_CODE_UNATTENDED_RETRY' = 'VIBECODE_UNATTENDED_RETRY'
    'CLAUDE_CODE_MAX_RETRIES' = 'VIBECODE_MAX_RETRIES'
    'CLAUDE_CODE_EXTRA_BODY' = 'VIBECODE_EXTRA_BODY'
    'CLAUDE_CODE_EXTRA_METADATA' = 'VIBECODE_EXTRA_METADATA'
    'CLAUDE_CODE_API_BASE_URL' = 'VIBECODE_API_BASE_URL'
    'CLAUDE_CODE_ADDITIONAL_PROTECTION' = 'VIBECODE_ADDITIONAL_PROTECTION'
    'CLAUDE_CODE_DISABLE_THINKING' = 'VIBECODE_DISABLE_THINKING'
    'CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING' = 'VIBECODE_DISABLE_ADAPTIVE_THINKING'
    'CLAUDE_CODE_MAX_OUTPUT_TOKENS' = 'VIBECODE_MAX_OUTPUT_TOKENS'
    'CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK' = 'VIBECODE_DISABLE_NONSTREAMING_FALLBACK'
    'CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING' = 'VIBECODE_ENABLE_FINE_GRAINED_TOOL_STREAMING'
    'CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY' = 'VIBECODE_MAX_TOOL_USE_CONCURRENCY'
    'CLAUDE_CODE_ACCOUNT_UUID' = 'VIBECODE_ACCOUNT_UUID'
    'CLAUDE_CODE_USER_EMAIL' = 'VIBECODE_USER_EMAIL'
    'CLAUDE_CODE_OAUTH_TOKEN_FILE_DESCRIPTOR' = 'VIBECODE_OAUTH_TOKEN_FILE_DESCRIPTOR'
    'CLAUDE_CODE_API_KEY_FILE_DESCRIPTOR' = 'VIBECODE_API_KEY_FILE_DESCRIPTOR'
    'CLAUDE_CODE_API_KEY_HELPER_TTL_MS' = 'VIBECODE_API_KEY_HELPER_TTL_MS'
    'CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS' = 'VIBECODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS'
    'CLAUDE_CODE_TAGS' = 'VIBECODE_TAGS'
    'CLAUDE_CODE_ACTION' = 'VIBECODE_ACTION'
    'CLAUDE_CODE_GB_BASE_URL' = 'VIBECODE_GB_BASE_URL'
    'CLAUDE_CODE_DATADOG_FLUSH_INTERVAL_MS' = 'VIBECODE_DATADOG_FLUSH_INTERVAL_MS'
    'CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS' = 'VIBECODE_SKIP_FAST_MODE_NETWORK_ERRORS'
    'CLAUDE_CODE_AUTO_COMPACT_WINDOW' = 'VIBECODE_AUTO_COMPACT_WINDOW'
    'CLAUDE_CODE_BLOCKING_LIMIT_OVERRIDE' = 'VIBECODE_BLOCKING_LIMIT_OVERRIDE'
    # 其他
    'ANT_CLAUDE_CODE_METRICS_ENDPOINT' = 'ANT_VIBECODE_METRICS_ENDPOINT'
}

# 获取所有 TypeScript 和 TSX 文件
$files = Get-ChildItem -Path "." -Recurse -Filter "*.ts" -File | Where-Object { $_.FullName -notmatch "node_modules" -and $_.FullName -notmatch "\.git" }
$tsxFiles = Get-ChildItem -Path "." -Recurse -Filter "*.tsx" -File | Where-Object { $_.FullName -notmatch "node_modules" -and $_.FullName -notmatch "\.git" }
$allFiles = $files + $tsxFiles

$totalFiles = $allFiles.Count
$processedFiles = 0
$modifiedFiles = 0

Write-Host "Found $totalFiles files to process..." -ForegroundColor Cyan

foreach ($file in $allFiles) {
    $processedFiles++
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $fileModified = $false

    foreach ($oldVar in $envVarMappings.Keys) {
        $newVar = $envVarMappings[$oldVar]

        # 替换 process.env.XXX
        $pattern1 = "process\.env\.$oldVar"
        $replacement1 = "process.env.$newVar"
        if ($content -match $pattern1) {
            $content = $content -replace $pattern1, $replacement1
            $fileModified = $true
        }

        # 替换字符串中的变量名 (用于错误消息等)
        $pattern2 = '"' + $oldVar + '"'
        $replacement2 = '"' + $newVar + '"'
        if ($content -match [regex]::Escape($pattern2)) {
            $content = $content -replace [regex]::Escape($pattern2), $replacement2
            $fileModified = $true
        }

        # 替换单引号字符串
        $pattern3 = "'" + $oldVar + "'"
        $replacement3 = "'" + $newVar + "'"
        if ($content -match [regex]::Escape($pattern3)) {
            $content = $content -replace [regex]::Escape($pattern3), $replacement3
            $fileModified = $true
        }
        
        # 替换注释中的变量名
        $pattern4 = $oldVar
        $replacement4 = $newVar
        if ($content -match $pattern4) {
            $content = $content -replace $pattern4, $replacement4
            $fileModified = $true
        }
    }

    if ($fileModified) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $modifiedFiles++
        Write-Host "[$processedFiles/$totalFiles] Modified: $($file.FullName)" -ForegroundColor Green
    } else {
        if ($processedFiles % 100 -eq 0) {
            Write-Host "[$processedFiles/$totalFiles] Processed..." -ForegroundColor Gray
        }
    }
}

Write-Host "`n===================================" -ForegroundColor Cyan
Write-Host "Environment variable rename part 2 complete!" -ForegroundColor Cyan
Write-Host "Total files processed: $totalFiles" -ForegroundColor White
Write-Host "Files modified: $modifiedFiles" -ForegroundColor Green
Write-Host "===================================`n" -ForegroundColor Cyan
