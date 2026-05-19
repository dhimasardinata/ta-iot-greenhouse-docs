import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const docsRoot = path.join(process.cwd(), 'src/content/docs');
const markdownLinkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
const bannedTerms = [/\bTaku\b/i, /service bisnis/i];

function fileExistsForHref(fromFile: string, href: string): boolean {
  const cleanHref = href.split('#', 1)[0];
  if (
    cleanHref.length === 0 ||
    cleanHref.startsWith('http://') ||
    cleanHref.startsWith('https://') ||
    cleanHref.startsWith('mailto:')
  ) {
    return true;
  }

  const base = cleanHref.startsWith('/')
    ? path.join(docsRoot, cleanHref.slice(1))
    : path.resolve(path.dirname(fromFile), cleanHref);

  const candidates = cleanHref.endsWith('/')
    ? [path.join(base, 'index.md'), path.join(base, 'index.mdx')]
    : [base, `${base}.md`, `${base}.mdx`, path.join(base, 'index.md')];

  return candidates.some((candidate) => fs.existsSync(candidate));
}

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(fullPath);
    }

    return entry.isFile() && /\.(md|mdx)$/.test(entry.name) ? [fullPath] : [];
  });
}

const errors: string[] = [];

for (const file of walk(docsRoot)) {
  const text = fs.readFileSync(file, 'utf8');
  if (!text.startsWith('---\n')) {
    errors.push(`${path.relative(process.cwd(), file)}: missing frontmatter`);
  }

  for (const term of bannedTerms) {
    if (term.test(text)) {
      errors.push(`${path.relative(process.cwd(), file)}: banned term ${term}`);
    }
  }

  for (const match of text.matchAll(markdownLinkPattern)) {
    const href = match[1];
    if (!fileExistsForHref(file, href)) {
      errors.push(`${path.relative(process.cwd(), file)}: missing link ${href}`);
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`OK docs validation (${walk(docsRoot).length} markdown files)`);
