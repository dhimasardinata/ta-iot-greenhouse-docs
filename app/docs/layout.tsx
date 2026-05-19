import Link from 'next/link';
import type { ReactNode } from 'react';

import { getNavTree, type NavNode } from '@/lib/docs';

function NavTree({ depth = 0, nodes }: { depth?: number; nodes: NavNode[] }) {
  return (
    <ul className={depth === 0 ? 'space-y-2' : 'mt-2 space-y-1 border-l border-zinc-200 pl-3 dark:border-zinc-800'}>
      {nodes.map((node) => {
        const label = node.href ? (
          <Link
            className="block rounded px-2 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            href={node.href}
          >
            {node.title}
          </Link>
        ) : (
          <span className="block px-2 py-1.5 text-sm font-medium text-zinc-950 dark:text-zinc-50">
            {node.title}
          </span>
        );

        if (node.children.length === 0) {
          return <li key={node.segment}>{label}</li>;
        }

        return (
          <li key={node.segment}>
            <details open={depth < 1}>
              <summary className="cursor-pointer rounded px-2 py-1.5 text-sm font-medium text-zinc-950 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-900">
                {node.title}
              </summary>
              {node.href ? (
                <Link
                  className="mt-1 block rounded px-2 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                  href={node.href}
                >
                  Ringkasan
                </Link>
              ) : null}
              <NavTree depth={depth + 1} nodes={node.children} />
            </details>
          </li>
        );
      })}
    </ul>
  );
}

export default function DocsLayout({ children }: { children: ReactNode }) {
  const tree = getNavTree();

  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-4 py-3">
          <Link className="text-sm font-semibold tracking-normal" href="/docs">
            TA IoT Greenhouse Docs
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50" href="/docs/14-complete-file-walkthrough/coverage-report">
              Coverage
            </Link>
            <Link className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50" href="/docs/99-generated/concept-coverage">
              Concepts
            </Link>
            <Link className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50" href="/api-reference">
              API
            </Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="hidden max-h-[calc(100vh-49px)] overflow-y-auto border-r border-zinc-200 px-4 py-5 dark:border-zinc-800 lg:sticky lg:top-[49px] lg:block">
          <NavTree nodes={tree} />
        </aside>
        <main className="min-w-0 px-4 py-8 sm:px-8 lg:px-12">{children}</main>
      </div>
    </div>
  );
}
