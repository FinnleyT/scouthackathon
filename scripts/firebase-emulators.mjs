import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');

const logsDir = path.join(repoRoot, 'logs');
fs.mkdirSync(logsDir, { recursive: true });

const firebaseConfigPath = path.join(repoRoot, 'firebase', 'firebase.json');
const emulatorDataDir = path.join(repoRoot, 'firebase', '.firebase', 'emulators');
fs.mkdirSync(emulatorDataDir, { recursive: true });

const firebaseEntry = path.join(repoRoot, 'node_modules', 'firebase-tools', 'lib', 'bin', 'firebase.js');

if (!fs.existsSync(firebaseEntry)) {
  console.error('firebase-tools is not installed. Run `npm install` first.');
  process.exit(1);
}

if (!fs.existsSync(firebaseConfigPath)) {
  console.error('Missing Firebase config at firebase/firebase.json.');
  process.exit(1);
}

const args = [
  firebaseEntry,
  '--config',
  firebaseConfigPath,
  'emulators:start',
  '--import',
  emulatorDataDir,
  '--export-on-exit',
  emulatorDataDir,
];

const firebaseProcess = spawn(process.execPath, args, {
  cwd: logsDir,
  env: process.env,
  stdio: 'inherit',
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    firebaseProcess.kill(signal);
  });
}

firebaseProcess.on('exit', (code) => {
  process.exitCode = code ?? 1;
});
