import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const docsRoot = path.join(process.cwd(), 'src/content/docs');
const markdownLinkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
const bannedTerms = [/\bTaku\b/i, /service bisnis/i];
const snippetsOnly = process.argv.includes('--snippets-only');
const allowedSnippetLanguages = new Set([
  'bash',
  'bat',
  'c',
  'cpp',
  'csv',
  'diff',
  'dotenv',
  'env',
  'h',
  'html',
  'http',
  'ini',
  'java',
  'javascript',
  'js',
  'json',
  'kotlin',
  'kt',
  'md',
  'mdx',
  'mermaid',
  'php',
  'plain',
  'plaintext',
  'py',
  'python',
  'sh',
  'sql',
  'text',
  'toml',
  'ts',
  'tsx',
  'txt',
  'vue',
  'xml',
  'yaml',
  'yml',
]);
const mermaidStartPattern =
  /^(block-beta|classDiagram|erDiagram|flowchart|gantt|gitGraph|graph|journey|mindmap|packet-beta|pie|quadrantChart|requirementDiagram|sequenceDiagram|stateDiagram|stateDiagram-v2|timeline|xychart-beta)\b/;

type SnippetLintResult = {
  errors: string[];
  snippets: number;
};

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

function lintSnippets(file: string, text: string): SnippetLintResult {
  const relative = path.relative(process.cwd(), file);
  const errors: string[] = [];
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  let snippets = 0;
  let index = 0;

  while (index < lines.length) {
    const opening = lines[index].match(/^\s*```(.*)$/);
    if (!opening) {
      index += 1;
      continue;
    }

    snippets += 1;
    const startLine = index + 1;
    const info = opening[1].trim();
    const language = info.split(/\s+/, 1)[0]?.toLowerCase() ?? '';
    const code: string[] = [];
    index += 1;

    while (index < lines.length) {
      const trimmed = lines[index].trim();
      if (trimmed.startsWith('```')) {
        if (trimmed !== '```') {
          errors.push(
            `${relative}:${index + 1}: snippet closing fence must be plain \`\`\``,
          );
        }
        break;
      }

      code.push(lines[index]);
      index += 1;
    }

    if (index >= lines.length) {
      errors.push(`${relative}:${startLine}: snippet fence is not closed`);
      continue;
    }

    if (!language) {
      errors.push(`${relative}:${startLine}: snippet fence missing language`);
    } else if (!allowedSnippetLanguages.has(language)) {
      errors.push(
        `${relative}:${startLine}: unsupported snippet language "${language}"`,
      );
    }

    if (code.every((line) => line.trim().length === 0)) {
      errors.push(`${relative}:${startLine}: snippet is empty`);
    }

    if (language === 'json') {
      try {
        JSON.parse(code.join('\n'));
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        errors.push(`${relative}:${startLine}: invalid JSON snippet (${message})`);
      }
    }

    if (language === 'mermaid') {
      const firstDiagramLine = code.find((line) => line.trim().length > 0);
      if (
        firstDiagramLine &&
        !mermaidStartPattern.test(firstDiagramLine.trim())
      ) {
        errors.push(
          `${relative}:${startLine}: mermaid snippet must start with a diagram keyword`,
        );
      }
    }

    index += 1;
  }

  return { errors, snippets };
}

const errors: string[] = [];
let snippetCount = 0;
const docs = walk(docsRoot);

for (const file of docs) {
  const text = fs.readFileSync(file, 'utf8');
  const snippetLint = lintSnippets(file, text);
  snippetCount += snippetLint.snippets;
  errors.push(...snippetLint.errors);

  if (!snippetsOnly) {
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
        errors.push(
          `${path.relative(process.cwd(), file)}: missing link ${href}`,
        );
      }
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

if (snippetsOnly) {
  console.log(
    `OK snippet lint (${snippetCount} code fences in ${docs.length} markdown files)`,
  );
} else {
  console.log(
    `OK docs validation (${docs.length} markdown files, ${snippetCount} code fences linted)`,
  );
}
