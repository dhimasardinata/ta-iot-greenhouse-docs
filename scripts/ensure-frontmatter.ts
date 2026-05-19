import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const docsRoot = path.join(process.cwd(), 'src/content/docs');

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(fullPath);
    }

    return entry.isFile() && /\.(md|mdx)$/.test(entry.name) ? [fullPath] : [];
  });
}

function fallbackTitle(file: string): string {
  const relative = path.relative(docsRoot, file);
  const basename = path.basename(relative, path.extname(relative));
  if (basename === 'index') {
    const parent = path.basename(path.dirname(relative));
    return parent.replace(/[-_]/g, ' ');
  }

  return basename.replace(/[-_]/g, ' ');
}

let changed = 0;

for (const file of walk(docsRoot)) {
  const text = fs.readFileSync(file, 'utf8');
  if (text.startsWith('---\n')) {
    continue;
  }

  const title = text.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? fallbackTitle(file);
  const next = `---\ntitle: ${JSON.stringify(title)}\n---\n\n${text}`;
  fs.writeFileSync(file, next, 'utf8');
  changed += 1;
}

console.log(`OK frontmatter ensured (${changed} file${changed === 1 ? '' : 's'} changed)`);
