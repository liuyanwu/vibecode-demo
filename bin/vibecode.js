#!/usr/bin/env node

/**
 * VibeCode 全局启动脚本
 * 类似 Claude Code 的 `claude` 命令
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 查找 .env 文件
const envPath = join(__dirname, '..', '.env');
const hasEnvFile = fs.existsSync(envPath);

// 构建命令
const args = [
  'run',
  ...(hasEnvFile ? ['--env-file=.env'] : []),
  'main.tsx',
  ...process.argv.slice(2)
];

// 启动 Bun
const bun = spawn('bun', args, {
  cwd: join(__dirname, '..'),
  stdio: 'inherit',
  env: process.env,
  shell: true
});

bun.on('error', (err) => {
  console.error('启动 VibeCode 失败:', err.message);
  console.error('请确保已安装 Bun: https://bun.sh');
  process.exit(1);
});

bun.on('exit', (code) => {
  process.exit(code);
});
