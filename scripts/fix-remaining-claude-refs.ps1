#!/usr/bin/env pwsh
# Fix remaining .claude references - Comprehensive replacement

$ErrorActionPreference = "Stop"

# Get all TypeScript files
$files = Get-ChildItem -Path "." -Recurse -Filter "*.ts" -File | Where-Object { $_.FullName -notlike "*node_modules*" -and $_.FullName -notlike "*.git*" }

$totalFiles = $files.Count
Write-Host "Found $totalFiles TypeScript files to process..." -ForegroundColor Cyan

$modifiedCount = 0
$processedCount = 0

foreach ($file in $files) {
    $processedCount++
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8 -ErrorAction SilentlyContinue
    if ($null -eq $content) { continue }

    $originalContent = $content

    # Pattern 1: join(..., '.claude', ...) -> join(..., '.vibecode', ...)
    $content = $content -replace "(join\([^'"]*['"])\.claude(['"][^)]*\))", '$1.vibecode$2'

    # Pattern 2: FOLDER_NAME: '.claude' -> FOLDER_NAME: '.vibecode'
    $content = $content -replace "(FOLDER_NAME:\s*['"])\.claude(['"])", '$1.vibecode$2'

    # Pattern 3: LOCK_FILE_REL and CRON_FILE_REL
    $content = $content -replace "(join\(['"])\.claude(['"]\s*,\s*['"]scheduled_tasks)", '$1.vibecode$2'

    # Pattern 4: worktreesDir function
    $content = $content -replace "(return\s+join\(repoRoot,\s*['"])\.claude(['"]\s*,\s*['"]worktrees['"]\))", '$1.vibecode$2'

    # Pattern 5: agentMemory paths
    $content = $content -replace "(join\(getCwd\(\),\s*['"])\.claude(['"]\s*,\s*['"]agent-memory)", '$1.vibecode$2'

    # Pattern 6: skills directory paths
    $content = $content -replace "(join\([^'"]*['"])\.claude(['"]\s*,\s*['"]skills['"])", '$1.vibecode$2'

    # Pattern 7: rules directory paths
    $content = $content -replace "(join\([^'"]*['"])\.claude(['"]\s*,\s*['"]rules['"])", '$1.vibecode$2'

    # Pattern 8: commands directory paths
    $content = $content -replace "(join\([^'"]*['"])\.claude(['"]\s*,\s*['"]commands['"])", '$1.vibecode$2'

    # Pattern 9: agents directory paths
    $content = $content -replace "(join\([^'"]*['"])\.claude(['"]\s*,\s*['"]agents['"])", '$1.vibecode$2'

    # Pattern 10: ide directory paths
    $content = $content -replace "(join\([^'"]*['"])\.claude(['"]\s*,\s*['"]ide['"])", '$1.vibecode$2'

    # Pattern 11: local directory paths
    $content = $content -replace "(join\([^'"]*['"])\.claude(['"]\s*,\s*['"]local['"])", '$1.vibecode$2'

    # Pattern 12: settings.json and settings.local.json paths
    $content = $content -replace "(join\([^'"]*['"])\.claude(['"]\s*,\s*['"]settings)", '$1.vibecode$2'

    # Pattern 13: SNAPSHOT_BASE paths
    $content = $content -replace "(join\(getCwd\(\),\s*['"])\.claude(['"]\s*,\s*SNAPSHOT_BASE)", '$1.vibecode$2'

    # Pattern 14: getManagedClaudeRulesDir function
    $content = $content -replace "(return\s+join\(getManagedFilePath\(\),\s*['"])\.claude(['"]\s*,\s*['"]rules['"]\))", '$1.vibecode$2'

    # Pattern 15: policySettings case
    $content = $content -replace "(return\s+join\(getManagedFilePath\(\),\s*['"])\.claude(['"]\s*,\s*dir\))", '$1.vibecode$2'

    # Pattern 16: projectSettings case
    $content = $content -replace "(return\s+join\(['"])\.claude(['"]\s*,\s*['"]settings\.json['"]\))", '$1.vibecode$2'

    # Pattern 17: localSettings case
    $content = $content -replace "(return\s+join\(['"])\.claude(['"]\s*,\s*['"]settings\.local\.json['"]\))", '$1.vibecode$2'

    # Pattern 18: CLAUDE.md paths
    $content = $content -replace "(join\(dir,\s*['"])\.claude(['"]\s*,\s*['"]CLAUDE\.md['"]\))", '$1.vibecode$2'

    # Pattern 19: debug directory
    $content = $content -replace "(join\([^'"]*['"])\.claude(['"]\s*,\s*['"]debug['"])", '$1.vibecode$2'

    # Pattern 20: chrome-native-host.txt path
    $content = $content -replace "(join\(homedir\(\),\s*['"])\.claude(['"]\s*,\s*['"]debug['"]\s*,\s*['"]chrome-native-host\.txt['"]\))", '$1.vibecode$2'

    # Pattern 21: scheduled_tasks.lock and scheduled_tasks.json
    $content = $content -replace "(join\(['"])\.claude(['"]\s*,\s*['"]scheduled_tasks)", '$1.vibecode$2'

    # Pattern 22: worktrees directory
    $content = $content -replace "(join\(repoRoot,\s*['"])\.claude(['"]\s*,\s*['"]worktrees['"]\))", '$1.vibecode$2'

    # Pattern 23: Copy settings to worktree
    $content = $content -replace "(join\(root,\s*['"])\.claude(['"]\))", '$1.vibecode$2'
    $content = $content -replace "(resolve\(cwd,\s*['"])\.claude(['"]\s*,\s*['"]settings)"

    # Pattern 24: Additional directories
    $content = $content -replace "(platformPath\.join\(dir,\s*['"])\.claude(['"]\s*,\s*['"]skills['"]\))", '$1.vibecode$2'

    # Pattern 25: Project dirs up to home
    $content = $content -replace "(join\(dir,\s*['"])\.claude(['"]\s*,\s*['"]skills['"]\))", '$1.vibecode$2'

    # Pattern 26: SKILL.md path
    $content = $content -replace "(join\(getCwd\(\),\s*['"])\.claude(['"]\s*,\s*['"]skills['"]\s*,\s*skillName\s*,\s*['"]SKILL\.md['"]\))", '$1.vibecode$2'

    # Pattern 27: User skills dir
    $content = $content -replace "(join\(getClaudeConfigHomeDir\(\),\s*['"])\.claude(['"]\s*,\s*['"]skills['"]\))", '$1.vibecode$2'

    # Pattern 28: Managed skills dir
    $content = $content -replace "(join\(getManagedFilePath\(\),\s*['"])\.claude(['"]\s*,\s*['"]skills['"]\))", '$1.vibecode$2'

    # Pattern 29: Project skills dirs
    $content = $content -replace "(join\(dir,\s*['"])\.claude(['"]\s*,\s*['"]skills['"]\))", '$1.vibecode$2'

    # Pattern 30: claudeSubdir
    $content = $content -replace "(const\s+claudeSubdir\s+=\s+join\(current,\s*['"])\.claude(['"]\s*,\s*subdir\))", '$1.vibecode$2'

    # Pattern 31: worktreeSubdir
    $content = $content -replace "(join\(gitRoot,\s*['"])\.claude(['"]\s*,\s*subdir\))", '$1.vibecode$2'

    # Pattern 32: mainClaudeSubdir
    $content = $content -replace "(join\(canonicalRoot,\s*['"])\.claude(['"]\s*,\s*subdir\))", '$1.vibecode$2'

    # Pattern 33: userDir
    $content = $content -replace "(join\(getClaudeConfigHomeDir\(\),\s*['"])\.claude(['"]\s*,\s*subdir\))", '$1.vibecode$2'

    # Pattern 34: managedDir
    $content = $content -replace "(join\(getManagedFilePath\(\),\s*['"])\.claude(['"]\s*,\s*subdir\))", '$1.vibecode$2'

    # Pattern 35: skillDir in while loop
    $content = $content -replace "(join\(currentDir,\s*['"])\.claude(['"]\s*,\s*['"]skills['"]\))", '$1.vibecode$2'

    # Pattern 36: loadSkillsFromSkillsDir
    $content = $content -replace "(join\(dir,\s*['"])\.claude(['"]\s*,\s*['"]skills['"]\))", '$1.vibecode$2'

    # Pattern 37: Deny write paths in sandbox
    $content = $content -replace "(resolve\(cwd,\s*['"])\.claude(['"]\s*,\s*['"]settings)"
    $content = $content -replace "(resolve\(originalCwd,\s*['"])\.claude(['"]\s*,\s*['"]skills['"]\))", '$1.vibecode$2'

    # Pattern 38: Settings files
    $content = $content -replace "(join\(dir,\s*['"])\.claude(['"]\s*,\s*file\))", '$1.vibecode$2'

    # Pattern 39: completionCache.ts
    if ($file.Name -eq "completionCache.ts") {
        $content = $content -replace "(const\s+claudeDir\s+=\s+join\(home,\s*['"])\.claude(['"]\))", '$1.vibecode$2'
    }

    # Pattern 40: doctorDiagnostic.ts
    if ($file.Name -eq "doctorDiagnostic.ts") {
        $content = $content -replace "(join\(homedir\(\),\s*['"])\.claude(['"]\s*,\s*['"]local['"]\))", '$1.vibecode$2'
    }

    # Pattern 41: nativeInstaller.ts
    if ($file.Name -eq "installer.ts" -and $content -match "localInstallDir") {
        $content = $content -replace "(join\(homedir\(\),\s*['"])\.claude(['"]\s*,\s*['"]local['"]\))", '$1.vibecode$2'
    }

    # Pattern 42: ide.ts
    if ($file.Name -eq "ide.ts") {
        $content = $content -replace "(resolve\(wslPath,\s*['"])\.claude(['"]\s*,\s*['"]ide['"]\))", '$1.vibecode$2'
        $content = $content -replace "(join\(usersDir,\s*user\.name,\s*['"])\.claude(['"]\s*,\s*['"]ide['"]\))", '$1.vibecode$2'
    }

    # Pattern 43: env.ts
    if ($file.Name -eq "env.ts") {
        $content = $content -replace "(const\s+filename\s+=\s+['"])\.claude(['"]\${fileSuffixForOauthConfig\(\)}\.json['"])", '$1.vibecode$2'
    }

    # Pattern 44: fallbackStorage.ts
    if ($file.Name -eq "fallbackStorage.ts") {
        $content = $content -replace "(sharing\s+['"])\.claude(['"]\s+between)", '$1.vibecode$2'
    }

    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $modifiedCount++
        Write-Host "[$processedCount/$totalFiles] Modified: $($file.FullName)" -ForegroundColor Green
    } elseif ($processedCount % 100 -eq 0) {
        Write-Host "[$processedCount/$totalFiles] Processed..." -ForegroundColor DarkGray
    }
}

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host "Remaining .claude reference fix complete!" -ForegroundColor Cyan
Write-Host "Total files processed: $processedCount" -ForegroundColor Cyan
Write-Host "Files modified: $modifiedCount" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Cyan
