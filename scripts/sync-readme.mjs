import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const README_PATH = path.join(ROOT, 'README.md');
const ABOUT_CANDIDATES = [
  path.join(ROOT, 'About.md'),
  path.join(ROOT, 'src', 'assets', 'About.md'),
];

const START = '<!-- ABOUT:START -->';
const END = '<!-- ABOUT:END -->';

function normalizeNewlines(text) {
  return text.replace(/\r\n/g, '\n');
}

function ensureTrailingNewline(text) {
  return text.endsWith('\n') ? text : text + '\n';
}

function buildAboutSection(aboutMarkdown, aboutSourcePath) {
  const trimmed = aboutMarkdown.trim();
  const header = '## About\n\n';

  if (!trimmed) {
    const hint = aboutSourcePath ? `\`${aboutSourcePath}\`` : '`About.md`';
    return header + `_About content lives in ${hint}._\n`;
  }

  return header + ensureTrailingNewline(trimmed);
}

function upsertBetweenMarkers(readme, replacement) {
  const normalized = normalizeNewlines(readme);

  const startIndex = normalized.indexOf(START);
  const endIndex = normalized.indexOf(END);

  if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
    const base = ensureTrailingNewline(normalized.trimEnd());
    return base + '\n' + START + '\n' + replacement.trimEnd() + '\n' + END + '\n';
  }

  const before = normalized.slice(0, startIndex + START.length);
  const after = normalized.slice(endIndex);
  return before + '\n' + replacement.trimEnd() + '\n' + after;
}

async function main() {
  const readme = await fs.readFile(README_PATH, 'utf8');

  let about = '';
  let aboutSourcePath = '';
  for (const candidate of ABOUT_CANDIDATES) {
    try {
      about = await fs.readFile(candidate, 'utf8');
      aboutSourcePath = path.relative(ROOT, candidate) || path.basename(candidate);
      break;
    } catch {
      // ignore
    }
  }

  const aboutSection = buildAboutSection(about, aboutSourcePath);
  const updated = upsertBetweenMarkers(readme, aboutSection);

  if (normalizeNewlines(readme) !== normalizeNewlines(updated)) {
    await fs.writeFile(README_PATH, updated, 'utf8');
    process.stdout.write('README.md updated from About.md\n');
  } else {
    process.stdout.write('README.md already up to date\n');
  }
}

await main();
