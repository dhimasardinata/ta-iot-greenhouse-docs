import type { ReactNode } from 'react';
import { codeToHtml } from 'shiki';

import { MermaidDiagram } from '@/components/MermaidDiagram';
import { normalizeDocHref } from '@/lib/docs';

type MarkdownViewProps = {
  content: string;
  slug: string[];
};

function normalizeSnippetLanguage(language: string): string {
  const lower = language.toLowerCase();
  const aliases = new Map([
    ['h', 'cpp'],
    ['kt', 'kotlin'],
    ['plain', 'text'],
    ['plaintext', 'text'],
    ['py', 'python'],
    ['sh', 'bash'],
    ['txt', 'text'],
    ['yml', 'yaml'],
  ]);

  return aliases.get(lower) ?? lower;
}

async function renderCodeFigure({
  code,
  key,
  language,
}: {
  code: string;
  key: number;
  language: string;
}): Promise<ReactNode> {
  const displayLanguage = language || 'text';
  const shikiLanguage = normalizeSnippetLanguage(displayLanguage);
  let highlighted = '';

  try {
    highlighted = await codeToHtml(code, {
      lang: shikiLanguage,
      themes: {
        dark: 'github-dark',
        light: 'github-light',
      },
    });
  } catch {
    highlighted = await codeToHtml(code, {
      lang: 'text',
      themes: {
        dark: 'github-dark',
        light: 'github-light',
      },
    });
  }

  return (
    <figure
      className="my-6 overflow-hidden rounded border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-[#24292e]"
      key={key}
    >
      {displayLanguage ? (
        <figcaption className="border-b border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-medium uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          {displayLanguage}
        </figcaption>
      ) : null}
      <div
        className="docs-code"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </figure>
  );
}

function isSpecialLine(line: string): boolean {
  return (
    /^#{1,6}\s+/.test(line) ||
    /^\s*```/.test(line) ||
    /^\s*---+\s*$/.test(line) ||
    /^\s*[-*]\s+/.test(line) ||
    /^\s*\d+\.\s+/.test(line) ||
    /^\s*>/.test(line) ||
    /^\s*\|/.test(line)
  );
}

function Inline({
  currentSlug,
  text,
}: {
  currentSlug: string[];
  text: string;
}): ReactNode {
  const parts = text.split(
    /(<br\s*\/>|`[^`]+`|\*\*[^*]+\*\*|\*[^*\n]+\*|\[[^\]]+\]\([^)]+\))/g,
  );

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;
        if (/^<br\s*\/>$/.test(part)) return <br key={index} />;
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              className="rounded border border-zinc-200 bg-zinc-100 px-1 py-0.5 text-[0.9em] text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              key={index}
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index}>
              <Inline currentSlug={currentSlug} text={part.slice(2, -2)} />
            </strong>
          );
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <strong key={index}>
              <Inline currentSlug={currentSlug} text={part.slice(1, -1)} />
            </strong>
          );
        }

        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return (
            <a
              className="font-medium text-emerald-700 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-900 dark:text-emerald-300 dark:decoration-emerald-700 dark:hover:text-emerald-100"
              href={normalizeDocHref(currentSlug, link[2])}
              key={index}
            >
              {link[1]}
            </a>
          );
        }

        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

function renderTable(lines: string[], currentSlug: string[], key: number): ReactNode {
  const rows = lines
    .map((line) =>
      line
        .trim()
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map((cell) => cell.trim()),
    )
    .filter((row) => !row.every((cell) => /^:?-{3,}:?$/.test(cell)));

  if (rows.length === 0) return null;

  const [head, ...body] = rows;

  return (
    <div className="my-6 overflow-x-auto rounded border border-zinc-200 dark:border-zinc-800" key={key}>
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-zinc-100 text-left dark:bg-zinc-900">
          <tr>
            {head.map((cell, index) => (
              <th className="border-b border-zinc-200 px-3 py-2 font-semibold dark:border-zinc-800" key={index}>
                <Inline currentSlug={currentSlug} text={cell} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, rowIndex) => (
            <tr className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-900" key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td className="align-top px-3 py-2" key={cellIndex}>
                  <Inline currentSlug={currentSlug} text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function MarkdownView({ content, slug }: MarkdownViewProps) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const nodes: ReactNode[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith('```')) {
      const language = trimmed.slice(3).trim().split(/\s+/, 1)[0] ?? '';
      const code: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        code.push(lines[index]);
        index += 1;
      }

      index += 1;
      if (language.split(/\s+/)[0]?.toLowerCase() === 'mermaid') {
        nodes.push(<MermaidDiagram chart={code.join('\n')} key={nodes.length} />);
        continue;
      }

      nodes.push(
        await renderCodeFigure({
          code: code.join('\n'),
          key: nodes.length,
          language,
        }),
      );
      continue;
    }

    if (/^\s*---+\s*$/.test(line)) {
      nodes.push(<hr className="my-8 border-zinc-200 dark:border-zinc-800" key={nodes.length} />);
      index += 1;
      continue;
    }

    if (/^\s*\|/.test(line)) {
      const table: string[] = [];
      while (index < lines.length && /^\s*\|/.test(lines[index])) {
        table.push(lines[index]);
        index += 1;
      }
      nodes.push(renderTable(table, slug, nodes.length));
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2];
      const id = text
        .toLowerCase()
        .replace(/`/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      const className =
        level === 1
          ? 'mb-5 mt-0 text-3xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50'
          : level === 2
            ? 'mb-3 mt-10 border-t border-zinc-200 pt-7 text-2xl font-semibold tracking-normal text-zinc-950 dark:border-zinc-800 dark:text-zinc-50'
            : 'mb-3 mt-7 text-xl font-semibold tracking-normal text-zinc-950 dark:text-zinc-50';

      const headingContent = <Inline currentSlug={slug} text={text} />;
      if (level === 1) {
        nodes.push(
          <h1 className={className} id={id} key={nodes.length}>
            {headingContent}
          </h1>,
        );
      } else if (level === 2) {
        nodes.push(
          <h2 className={className} id={id} key={nodes.length}>
            {headingContent}
          </h2>,
        );
      } else if (level === 3) {
        nodes.push(
          <h3 className={className} id={id} key={nodes.length}>
            {headingContent}
          </h3>,
        );
      } else {
        nodes.push(
          <h4 className={className} id={id} key={nodes.length}>
            {headingContent}
          </h4>,
        );
      }
      index += 1;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*]\s+/, ''));
        index += 1;
      }
      nodes.push(
        <ul className="my-4 list-disc space-y-2 pl-6" key={nodes.length}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>
              <Inline currentSlug={slug} text={item} />
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+\.\s+/, ''));
        index += 1;
      }
      nodes.push(
        <ol className="my-4 list-decimal space-y-2 pl-6" key={nodes.length}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>
              <Inline currentSlug={slug} text={item} />
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    if (/^\s*>/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^\s*>/.test(lines[index])) {
        quote.push(lines[index].replace(/^\s*>\s?/, ''));
        index += 1;
      }
      nodes.push(
        <blockquote
          className="my-5 border-l-4 border-emerald-600 bg-emerald-50 px-4 py-3 text-zinc-800 dark:bg-emerald-950/30 dark:text-zinc-100"
          key={nodes.length}
        >
          {quote.map((item, quoteIndex) => (
            <p className="my-1" key={quoteIndex}>
              <Inline currentSlug={slug} text={item} />
            </p>
          ))}
        </blockquote>,
      );
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length && lines[index].trim() && !isSpecialLine(lines[index])) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    nodes.push(
      <p className="my-4 leading-7 text-zinc-800 dark:text-zinc-200" key={nodes.length}>
        <Inline currentSlug={slug} text={paragraph.join(' ')} />
      </p>,
    );
  }

  return <div className="docs-markdown">{nodes}</div>;
}
