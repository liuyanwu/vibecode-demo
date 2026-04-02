#!/usr/bin/env node
/**
 * Fix final .claude references in comments and documentation
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files that need final fixes
const filesToFix = [
  { file: 'utils/permissions/filesystem.ts', patterns: [
    { from: /Any nested \.claude directories/g, to: "Any nested .vibecode directories" },
    { from: /Skip this \.claude/g, to: "Skip this .vibecode" },
    { from: /since \.claude is a dangerous directory/g, to: "since .vibecode is a dangerous directory" },
  ]},
  { file: 'utils/permissions/pathValidation.ts', patterns: [
    { from: /Set-Location \.\.\.claude;/g, to: "Set-Location ./.vibecode;" },
    { from: /cwd='\.\.\.claude'/g, to: "cwd='./.vibecode'" },
  ]},
  { file: 'tools/PowerShellTool/powershellPermissions.ts', patterns: [
    { from: /`Set-Location \.\.\.claude; Set-Content \.\.\.\/settings\.json/g, to: "`Set-Location ./.vibecode; Set-Content ./settings.json" },
  ]},
  { file: 'tools/PowerShellTool/pathValidation.ts', patterns: [
    { from: /Set-Location \.\.\.claude; Set-Content \.\.\.\/settings\.json/g, to: "Set-Location ./.vibecode; Set-Content ./settings.json" },
    { from: /after `Set-Location \.\.\.claude`/g, to: "after `Set-Location ./.vibecode`" },
    { from: /cwd='\.\.\.claude'/g, to: "cwd='./.vibecode'" },
  ]},
  { file: 'tools/PowerShellTool/modeValidation.ts', patterns: [
    { from: /Set-Location \.\.\.claude; Set-Content \.\.\.\/settings\.json/g, to: "Set-Location ./.vibecode; Set-Content ./settings.json" },
  ]},
  { file: 'utils/claudemd.ts', patterns: [
    { from: /directory containing \.claude/g, to: "directory containing .vibecode" },
  ]},
  { file: 'bridge/bridgeMain.ts', patterns: [
    { from: /from Claude Code on Web or your Mobile app/g, to: "from VibeCode on Web or your Mobile app" },
  ]},
  { file: 'commands/review.ts', patterns: [
    { from: /"Claude Code on the web"/g, to: '"VibeCode on the web"' },
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
  console.log('Final .claude reference fix complete!');
  console.log(`Total files processed: ${totalFiles}`);
  console.log(`Files modified: ${totalModified}`);
  console.log('===================================');
}

main().catch(console.error);
