#!/usr/bin/env node
/**
 * Fix specific .claude references that need to be changed
 * This script handles the remaining cases after the broad replacement
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files that need specific fixes
const filesToFix = [
  // Path-related files
  { file: 'skills/loadSkillsDir.ts', patterns: [
    { from: /join\(getManagedFilePath\(\), ['"]\.claude['"], dir\)/g, to: "join(getManagedFilePath(), '.vibecode', dir)" },
    { from: /join\(getManagedFilePath\(\), ['"]\.claude['"], ['"]skills['"]\)/g, to: "join(getManagedFilePath(), '.vibecode', 'skills')" },
    { from: /join\(dir, ['"]\.claude['"], ['"]skills['"]\)/g, to: "join(dir, '.vibecode', 'skills')" },
    { from: /join\(currentDir, ['"]\.claude['"], ['"]skills['"]\)/g, to: "join(currentDir, '.vibecode', 'skills')" },
  ]},
  { file: 'utils/config.ts', patterns: [
    { from: /join\(getManagedFilePath\(\), ['"]\.claude['"], ['"]rules['"]\)/g, to: "join(getManagedFilePath(), '.vibecode', 'rules')" },
  ]},
  { file: 'utils/claudemd.ts', patterns: [
    { from: /join\(dir, ['"]\.claude['"], ['"]CLAUDE\.md['"]\)/g, to: "join(dir, '.vibecode', 'CLAUDE.md')" },
    { from: /join\(dir, ['"]\.claude['"], ['"]rules['"]\)/g, to: "join(dir, '.vibecode', 'rules')" },
    { from: /join\(dir, ['"]\.claude['"], subdir\)/g, to: "join(dir, '.vibecode', subdir)" },
    { from: /join\(gitRoot, ['"]\.claude['"], subdir\)/g, to: "join(gitRoot, '.vibecode', subdir)" },
    { from: /join\(canonicalRoot, ['"]\.claude['"], subdir\)/g, to: "join(canonicalRoot, '.vibecode', subdir)" },
    { from: /\`\$\{sep\}\.claude\$\{sep\}rules\$\{sep\}\`/g, to: '`${sep}.vibecode${sep}rules${sep}`' },
    { from: /Parent of \.claude/g, to: "Parent of .vibecode" },
  ]},
  { file: 'utils/markdownConfigLoader.ts', patterns: [
    { from: /join\(current, ['"]\.claude['"], subdir\)/g, to: "join(current, '.vibecode', subdir)" },
    { from: /join\(getManagedFilePath\(\), ['"]\.claude['"], subdir\)/g, to: "join(getManagedFilePath(), '.vibecode', subdir)" },
    { from: /join\(gitRoot, ['"]\.claude['"], subdir\)/g, to: "join(gitRoot, '.vibecode', subdir)" },
    { from: /join\(canonicalRoot, ['"]\.claude['"], subdir\)/g, to: "join(canonicalRoot, '.vibecode', subdir)" },
    { from: /collecting all \.claude directories/g, to: "collecting all .vibecode directories" },
    { from: /const claudeSubdir/g, to: "const vibecodeSubdir" },
    { from: /mainClaudeSubdir/g, to: "mainVibecodeSubdir" },
    { from: /worktreeSubdir/g, to: "worktreeSubdir" }, // Keep this one as is since it's a variable name
  ]},
  { file: 'utils/ide.ts', patterns: [
    { from: /resolve\(wslPath, ['"]\.claude['"], ['"]ide['"]\)/g, to: "resolve(wslPath, '.vibecode', 'ide')" },
    { from: /join\(usersDir, user\.name, ['"]\.claude['"], ['"]ide['"]\)/g, to: "join(usersDir, user.name, '.vibecode', 'ide')" },
  ]},
  { file: 'utils/env.ts', patterns: [
    { from: /const filename = `\.claude\$\{fileSuffixForOauthConfig\(\)\}\.json`/g, to: "const filename = `.vibecode${fileSuffixForOauthConfig()}.json`" },
  ]},
  { file: 'utils/permissions/filesystem.ts', patterns: [
    { from: /'\.claude\.json'/g, to: "'.vibecode.json'" },
    { from: /endsWith\(`\$\{sep\}\.claude\$\{sep\}settings\.json`\)/g, to: "endsWith(`${sep}.vibecode${sep}settings.json`)" },
    { from: /endsWith\(`\$\{sep\}\.claude\$\{sep\}settings\.local\.json`\)/g, to: "endsWith(`${sep}.vibecode${sep}settings.local.json`)" },
    { from: /join\(getOriginalCwd\(\), ['"]\.claude['"], ['"]commands['"]\)/g, to: "join(getOriginalCwd(), '.vibecode', 'commands')" },
    { from: /join\(getOriginalCwd\(\), ['"]\.claude['"], ['"]agents['"]\)/g, to: "join(getOriginalCwd(), '.vibecode', 'agents')" },
    { from: /join\(getOriginalCwd\(\), ['"]\.claude['"], ['"]skills['"]\)/g, to: "join(getOriginalCwd(), '.vibecode', 'skills')" },
    { from: /join\(homedir\(\), ['"]\.claude['"], ['"]skills['"]\)/g, to: "join(homedir(), '.vibecode', 'skills')" },
    { from: /Special case: \.vibecode\/worktrees\/ is a structural path \(where Claude stores/g, to: "Special case: .vibecode/worktrees/ is a structural path (where VibeCode stores" },
    { from: /Skip the \.claude/g, to: "Skip the .vibecode" },
    { from: /dir === ['"]\.claude['"]/g, to: "dir === '.vibecode'" },
    { from: /\.claude , \.bashrc/g, to: ".vibecode , .bashrc" },
    { from: /is a dangerous directory/g, to: "is a dangerous directory" },
    { from: /Edit\(\.claude\)/g, to: "Edit(.vibecode)" },
  ]},
  { file: 'utils/permissions/pathValidation.ts', patterns: [
    { from: /since \.claude is a dangerous directory/g, to: "since .vibecode is a dangerous directory" },
    { from: /Edit\(\.claude\)/g, to: "Edit(.vibecode)" },
    { from: /Example: `Set-Location \.\.claude;/g, to: "Example: `Set-Location ./.vibecode;" },
    { from: /cwd='\.\.claude'/g, to: "cwd='./.vibecode'" },
  ]},
  { file: 'utils/worktree.ts', patterns: [
    { from: /to the worktree's \.claude directory/g, to: "to the worktree's .vibecode directory" },
  ]},
  { file: 'utils/secureStorage/fallbackStorage.ts', patterns: [
    { from: /sharing \.claude between host and containers/g, to: "sharing .vibecode between host and containers" },
  ]},
  { file: 'tools/BashTool/bashPermissions.ts', patterns: [
    { from: /`cd \.claude && echo x > settings\.json`/g, to: "`cd .vibecode && echo x > settings.json`" },
  ]},
  { file: 'tools/PowerShellTool/powershellPermissions.ts', patterns: [
    { from: /`Set-Location \.\.claude; Set-Content \.\.\/settings\.json/g, to: "`Set-Location ./.vibecode; Set-Content ./settings.json" },
  ]},
  { file: 'tools/PowerShellTool/pathValidation.ts', patterns: [
    { from: /since \.claude is a dangerous directory/g, to: "since .vibecode is a dangerous directory" },
    { from: /Example attack \(finding #3\):/g, to: "Example attack (finding #3):" },
    { from: /Set-Location \.\.claude; Set-Content \.\.\/settings\.json/g, to: "Set-Location ./.vibecode; Set-Content ./settings.json" },
    { from: /after `Set-Location \.\.claude`/g, to: "after `Set-Location ./.vibecode`" },
    { from: /cwd='\.\.claude'/g, to: "cwd='./.vibecode'" },
  ]},
  { file: 'tools/PowerShellTool/modeValidation.ts', patterns: [
    { from: /Example: `Set-Location \.\.claude; Set-Content \.\.\/settings\.json/g, to: "Example: `Set-Location ./.vibecode; Set-Content ./settings.json" },
  ]},
  { file: 'utils/errors.ts', patterns: [
    { from: /a file named/g, to: "a file named" },
    { from: /`\.claude` exists/g, to: "`.vibecode` exists" },
  ]},
  { file: 'skills/bundled/updateConfig.ts', patterns: [
    { from: /"Edit\(\.claude\)"/g, to: '"Edit(.vibecode)"' },
  ]},
  // Config key renames
  { file: 'utils/auth.ts', patterns: [
    { from: /storageData\.claudeAiOauth/g, to: "storageData.vibecodeAiOauth" },
    { from: /oauthData = storageData\?\.claudeAiOauth/g, to: "oauthData = storageData?.vibecodeAiOauth" },
  ]},
  { file: 'utils/user.ts', patterns: [
    { from: /config\.claudeCodeFirstTokenDate/g, to: "config.vibecodeFirstTokenDate" },
  ]},
  { file: 'services/api/firstTokenDate.ts', patterns: [
    { from: /config\.claudeCodeFirstTokenDate/g, to: "config.vibecodeFirstTokenDate" },
  ]},
  { file: 'utils/plugins/hintRecommendation.ts', patterns: [
    { from: /GlobalConfig\.claudeCodeHints/g, to: "GlobalConfig.vibecodeHints" },
    { from: /getGlobalConfig\(\)\.claudeCodeHints/g, to: "getGlobalConfig().vibecodeHints" },
    { from: /current\.claudeCodeHints/g, to: "current.vibecodeHints" },
    { from: /claudeCodeHints:/g, to: "vibecodeHints:" },
  ]},
  { file: 'services/mcp/claudeai.ts', patterns: [
    { from: /current\.claudeAiMcpEverConnected/g, to: "current.vibecodeAiMcpEverConnected" },
    { from: /getGlobalConfig\(\)\.claudeAiMcpEverConnected/g, to: "getGlobalConfig().vibecodeAiMcpEverConnected" },
    { from: /hasClaudeAiMcpEverConnected/g, to: "hasVibecodeAiMcpEverConnected" },
    { from: /claudeAiMcpEverConnected:/g, to: "vibecodeAiMcpEverConnected:" },
  ]},
  { file: 'utils/claudeInChrome/setup.ts', patterns: [
    { from: /config\.claudeInChromeDefaultEnabled/g, to: "config.vibecodeInChromeDefaultEnabled" },
  ]},
  // Variable name renames in terminalLauncher.ts
  { file: 'utils/deepLink/terminalLauncher.ts', patterns: [
    { from: /claudePath/g, to: "vibecodePath" },
    { from: /claudeArgs/g, to: "vibecodeArgs" },
  ]},
  // CSS class renames
  { file: 'commands/insights.ts', patterns: [
    { from: /claude-md-section/g, to: "vibecode-md-section" },
    { from: /claude-md-actions/g, to: "vibecode-md-actions" },
    { from: /claude-md-item/g, to: "vibecode-md-item" },
    { from: /sessionFacets\.claude_helpfulness/g, to: "sessionFacets.vibecode_helpfulness" },
    { from: /f\.claude_helpfulness/g, to: "f.vibecode_helpfulness" },
    { from: /suggestions\.claude_md_additions/g, to: "suggestions.vibecode_md_additions" },
  ]},
  // Data field renames
  { file: 'utils/attribution.ts', patterns: [
    { from: /attributionData\?\.summary\.claudePercent/g, to: "attributionData?.summary.vibecodePercent" },
  ]},
  { file: 'utils/api.ts', patterns: [
    { from: /userContext\.claudeMd/g, to: "userContext.vibecodeMd" },
  ]},
  { file: 'utils/claudemd.ts', patterns: [
    { from: /getInitialSettings\(\)\.claudeMdExcludes/g, to: "getInitialSettings().vibecodeMdExcludes" },
  ]},
  { file: 'utils/commitAttribution.ts', patterns: [
    { from: /existingState\?\.claudeContribution/g, to: "existingState?.vibecodeContribution" },
    { from: /newFileState\.claudeContribution/g, to: "newFileState.vibecodeContribution" },
    { from: /fileState\.claudeContribution/g, to: "fileState.vibecodeContribution" },
    { from: /existing\.claudeContribution/g, to: "existing.vibecodeContribution" },
    { from: /claudeChars/g, to: "vibecodeChars" },
    { from: /result\.claudeChars/g, to: "result.vibecodeChars" },
    { from: /totalClaudeChars/g, to: "totalVibecodeChars" },
    { from: /result\.claudeChars/g, to: "result.vibecodeChars" },
    { from: /Claude deleted this file/g, to: "VibeCode deleted this file" },
  ]},
  // Analytics metadata
  { file: 'services/analytics/metadata.ts', patterns: [
    { from: /envContext\.claudeCodeContainerId/g, to: "envContext.vibecodeContainerId" },
    { from: /envContext\.claudeCodeRemoteSessionId/g, to: "envContext.vibecodeRemoteSessionId" },
    { from: /VIBECODE_container_id/g, to: "VIBECODE_container_id" }, // Already correct
    { from: /VIBECODE_remote_session_id/g, to: "VIBECODE_remote_session_id" }, // Already correct
  ]},
  // MCP configs
  { file: 'services/mcp/useManageMCPConnections.ts', patterns: [
    { from: /claudeCodeConfigs/g, to: "vibecodeConfigs" },
    { from: /claudeaiConfigs/g, to: "vibecodeaiConfigs" },
    { from: /counts\.claudeai/g, to: "counts.vibecodeai" },
  ]},
];

// Main function
async function main() {
  let totalModified = 0;
  let totalFiles = 0;

  for (const { file, patterns } of filesToFix) {
    const filePath = path.join(process.cwd(), file);

    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${file}`);
      continue;
    }

    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      let modified = false;

      for (const { from, to } of patterns) {
        if (from.test(content)) {
          content = content.replace(from, to);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Modified: ${file}`);
        totalModified++;
      }
      totalFiles++;
    } catch (error) {
      console.error(`Error processing ${file}: ${error.message}`);
    }
  }

  console.log('\n===================================');
  console.log('Specific .claude reference fix complete!');
  console.log(`Total files processed: ${totalFiles}`);
  console.log(`Files modified: ${totalModified}`);
  console.log('===================================');
}

main().catch(console.error);
