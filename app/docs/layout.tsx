import Link from "next/link";
import type { ReactNode } from "react";

import { DocsSearch } from "@/components/DocsSearch";
import { getNavTree, type NavNode } from "@/lib/docs";

function firstHref(node: NavNode): string | undefined {
  if (node.href) return node.href;

  for (const child of node.children) {
    const href = firstHref(child);
    if (href) return href;
  }

  return undefined;
}

function countPages(node: NavNode): number {
  return (
    (node.href ? 1 : 0) +
    node.children.reduce((total, child) => total + countPages(child), 0)
  );
}

function ModuleList({
  compact = false,
  nodes,
}: {
  compact?: boolean;
  nodes: NavNode[];
}) {
  return (
    <nav aria-label="Pilih modul dokumentasi" className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Pilih Modul
      </p>
      <ul className={compact ? "grid gap-2 sm:grid-cols-2" : "space-y-1.5"}>
        {nodes.map((node) => {
          const href = firstHref(node);
          const pageCount = countPages(node);

          if (!href) return null;

          return (
            <li key={node.segment}>
              <Link
                className="flex items-start justify-between gap-3 rounded border border-zinc-200 px-3 py-2 text-sm hover:border-emerald-300 hover:bg-emerald-50 dark:border-zinc-800 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/30"
                href={href}
              >
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  {node.title}
                </span>
                <span className="shrink-0 text-xs text-zinc-500 dark:text-zinc-400">
                  {pageCount}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function NavTree({ depth = 0, nodes }: { depth?: number; nodes: NavNode[] }) {
  return (
    <ul
      className={
        depth === 0
          ? "space-y-2"
          : "mt-2 space-y-1 border-l border-zinc-200 pl-3 dark:border-zinc-800"
      }
    >
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
            <Link
              className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
              href="/docs/14-complete-file-walkthrough/coverage-report"
            >
              Coverage
            </Link>
            <Link
              className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
              href="/docs/99-generated/concept-coverage"
            >
              Concepts
            </Link>
            <Link
              className="text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
              href="/api-reference"
            >
              API
            </Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
        <section className="space-y-5 border-b border-zinc-200 px-4 py-5 dark:border-zinc-800 lg:hidden">
          <DocsSearch />
          <ModuleList compact nodes={tree} />
          <details>
            <summary className="cursor-pointer rounded border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-950 dark:border-zinc-800 dark:text-zinc-50">
              Semua Materi
            </summary>
            <div className="mt-3">
              <NavTree nodes={tree} />
            </div>
          </details>
        </section>
        <aside className="hidden max-h-[calc(100vh-49px)] overflow-y-auto border-r border-zinc-200 px-4 py-5 dark:border-zinc-800 lg:sticky lg:top-[49px] lg:block">
          <div className="space-y-6">
            <DocsSearch />
            <ModuleList nodes={tree} />
            <nav aria-label="Daftar semua materi" className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Semua Materi
              </p>
              <NavTree nodes={tree} />
            </nav>
          </div>
        </aside>
        <main className="min-w-0 px-4 py-8 sm:px-8 lg:px-12">{children}</main>
      </div>
    </div>
  );
}
