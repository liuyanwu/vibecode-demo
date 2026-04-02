# VibeCode 目录重命名脚本
# 将 ~/.claude 和 .claude 目录引用替换为 ~/.vibecode 和 .vibecode

$ErrorActionPreference = "Stop"

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

    # 替换 ~/.claude 为 ~/.vibecode
    if ($content -match '~/.claude') {
        $content = $content -replace '~/.claude', '~/.vibecode'
        $fileModified = $true
    }

    # 替换 .claude/ 为 .vibecode/ (项目目录)
    if ($content -match '\.claude/') {
        $content = $content -replace '\.claude/', '.vibecode/'
        $fileModified = $true
    }
    
    # 替换 .claude-plugin 为 .vibecode-plugin
    if ($content -match '\.claude-plugin') {
        $content = $content -replace '\.claude-plugin', '.vibecode-plugin'
        $fileModified = $true
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
Write-Host "Directory rename complete!" -ForegroundColor Cyan
Write-Host "Total files processed: $totalFiles" -ForegroundColor White
Write-Host "Files modified: $modifiedFiles" -ForegroundColor Green
Write-Host "===================================`n" -ForegroundColor Cyan
