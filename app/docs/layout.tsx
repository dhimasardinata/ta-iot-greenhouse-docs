import Link from "next/link";
import type { ReactNode } from "react";

import { DocsNavContent } from "@/components/DocsNavContent";
import { MobileDocsNav } from "@/components/MobileDocsNav";
import { getNavTree } from "@/lib/docs";

export default function DocsLayout({ children }: { children: ReactNode }) {
  const tree = getNavTree();

  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-4 py-3">
          <Link
            className="min-w-0 truncate text-sm font-semibold tracking-normal"
            href="/docs"
          >
            TA IoT Greenhouse Docs
          </Link>
          <div className="flex items-center gap-2">
            <nav className="hidden items-center gap-3 text-sm sm:flex">
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
            <MobileDocsNav nodes={tree} />
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="hidden max-h-[calc(100vh-49px)] overflow-y-auto border-r border-zinc-200 px-4 py-5 dark:border-zinc-800 lg:sticky lg:top-[49px] lg:block">
          <DocsNavContent nodes={tree} searchId="desktop-docs-search" />
        </aside>
        <main className="min-w-0 px-4 py-6 sm:px-8 lg:px-12">{children}</main>
      </div>
    </div>
  );
}
