#!/usr/bin/env node
/**
 * Fix remaining .claude references - Comprehensive replacement
 * This script replaces .claude directory references with .vibecode
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Files to skip (external URLs, documentation, etc.)
const skipPatterns = [
  /node_modules/,
  /\.git/,
  /constants\/oauth\.ts$/,  // Contains external OAuth URLs
  /utils\/claudemd\.ts$/,   // Special handling needed
];

// Patterns to skip (not actual paths)
const skipContentPatterns = [
  /code\.claude\.com/,           // External URLs
  /platform\.claude\.com/,       // External URLs
  /claude\.ai/,                  // External URLs
  /api\.anthropic\.com/,        // External URLs
  /downloads\.claude\.ai/,      // External URLs
  /schemastore\.org/,            // External URLs
  /github\.com\/anthropics/,     // GitHub references
  /com\.anthropic\.claude/,     // Bundle IDs
  /com\.anthropic\.claude_code/, // Telemetry names
  /anthropic\.claude-/,          // Model IDs
  /claudeAiOauth/,               // Data structure keys
  /claudePercent/,               // Data fields
  /claudeContribution/,          // Data fields
  /claude_helpfulness/,          // Data fields
  /claudeMd/,                    // Data fields
  /claudeMdAdditions/,           // Data fields
  /claudeMdExcludes/,            // Config keys
  /claudeCodeFirstTokenDate/,    // Config keys
  /claudeCodeHints/,             // Config keys
  /claudeAiMcpEverConnected/,    // Config keys
  /claudeCodeContainerId/,       // Data fields
  /claudeCodeRemoteSessionId/,   // Data fields
  /claudeCodeConfigs/,           // Variable names
  /claudeaiConfigs/,             // Variable names
  /claudePath/,                  // Variable names in terminalLauncher.ts
  /claudeArgs/,                  // Variable names
  /claudeInChromeDefaultEnabled/, // Config key
  /claudeInChrome/,              // Module name
  /claudeCodeGuideAgent/,        // File name
  /CDP_DOCS_MAP_URL/,            // External URL constant
  /VIBECODE_DOCS_MAP_URL/,       // External URL constant
  /CCR_TERMS_URL/,               // External URL constant
  /DOCUMENTATION_BASE/,          // External URL constant
  /sharing \.claude/,             // Comment
  /ENOTDIR.*\.claude/,           // Error message
  /Set-Location.*\.claude/,      // Example in comment
  /cd.*\.claude/,                // Example in comment
];

// Get all TypeScript files
function getAllTsFiles(dir, files = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      if (item.name === 'node_modules' || item.name === '.git') continue;
      getAllTsFiles(fullPath, files);
    } else if (item.name.endsWith('.ts')) {
      // Check if file should be skipped
      const shouldSkip = skipPatterns.some(pattern => pattern.test(fullPath));
      if (!shouldSkip) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

// Check if content should be skipped
function shouldSkipContent(content) {
  return skipContentPatterns.some(pattern => pattern.test(content));
}

// Replace patterns in content
function replaceClaudeRefs(content, filePath) {
  let modified = false;
  let newContent = content;

  // Pattern 1: join(..., '.claude', ...) -> join(..., '.vibecode', ...)
  // But be careful not to replace in comments or strings that are URLs
  const joinPattern = /join\(([^)]*['"])\.claude(['"][^)]*)\)/g;
  if (joinPattern.test(newContent)) {
    newContent = newContent.replace(joinPattern, 'join($1.vibecode$2)');
    modified = true;
  }

  // Pattern 2: FOLDER_NAME: '.claude' -> FOLDER_NAME: '.vibecode'
  const folderNamePattern = /(FOLDER_NAME:\s*['"])\.claude(['"])/g;
  if (folderNamePattern.test(newContent)) {
    newContent = newContent.replace(folderNamePattern, '$1.vibecode$2');
    modified = true;
  }

  // Pattern 3: '.claude' in path strings (not in comments)
  // Only replace when it's clearly a path
  const pathPattern = /(['"])\.claude(['"])/g;
  const matches = newContent.match(pathPattern);
  if (matches) {
    // Check context to ensure it's a path
    newContent = newContent.replace(pathPattern, (match, p1, p2, offset, string) => {
      // Get some context around the match
      const context = string.substring(Math.max(0, offset - 50), Math.min(string.length, offset + match.length + 50));

      // Skip if in a comment
      if (context.includes('//') && context.indexOf('//') < context.indexOf("'.claude'") && context.indexOf("'.claude'") > 0) {
        return match;
      }

      // Skip if it's part of a URL
      if (context.includes('http') || context.includes('www.')) {
        return match;
      }

      // Skip if it's in a documentation string
      if (context.includes('See:') || context.includes('https://')) {
        return match;
      }

      return p1 + '.vibecode' + p2;
    });
    modified = true;
  }

  return { content: newContent, modified };
}

// Main function
async function main() {
  console.log('Finding TypeScript files...');
  const files = getAllTsFiles('.');
  console.log(`Found ${files.length} TypeScript files to process...\n`);

  let modifiedCount = 0;
  let processedCount = 0;

  for (const file of files) {
    processedCount++;

    try {
      const content = fs.readFileSync(file, 'utf-8');

      // Skip if content has patterns we should ignore
      if (shouldSkipContent(content)) {
        if (processedCount % 100 === 0) {
          console.log(`[${processedCount}/${files.length}] Skipped (has external refs)...`);
        }
        continue;
      }

      const result = replaceClaudeRefs(content, file);

      if (result.modified) {
        fs.writeFileSync(file, result.content, 'utf-8');
        modifiedCount++;
        console.log(`[${processedCount}/${files.length}] Modified: ${file}`);
      } else if (processedCount % 100 === 0) {
        console.log(`[${processedCount}/${files.length}] Processed...`);
      }
    } catch (error) {
      console.error(`Error processing ${file}: ${error.message}`);
    }
  }

  console.log('\n===================================');
  console.log('Remaining .claude reference fix complete!');
  console.log(`Total files processed: ${processedCount}`);
  console.log(`Files modified: ${modifiedCount}`);
  console.log('===================================');
}

main().catch(console.error);
