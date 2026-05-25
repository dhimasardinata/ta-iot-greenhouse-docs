"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { DocsSearch } from "@/components/DocsSearch";
import type { NavNode } from "@/lib/docs";

type DocsNavContentProps = {
  compact?: boolean;
  nodes: NavNode[];
  onNavigate?: () => void;
  searchAutoFocus?: boolean;
  searchId?: string;
};

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

function containsPath(node: NavNode, pathname: string): boolean {
  return (
    node.href === pathname ||
    node.children.some((child) => containsPath(child, pathname))
  );
}

function ModuleList({
  compact = false,
  nodes,
  onNavigate,
}: {
  compact?: boolean;
  nodes: NavNode[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Pilih modul dokumentasi" className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Modul Utama
      </p>
      <ul className={compact ? "grid gap-2" : "space-y-1.5"}>
        {nodes.map((node) => {
          const href = firstHref(node);
          const pageCount = countPages(node);
          const active = containsPath(node, pathname);

          if (!href) return null;

          return (
            <li key={node.segment}>
              <Link
                aria-current={href === pathname ? "page" : undefined}
                className={[
                  "flex items-start justify-between gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-50"
                    : "border-zinc-200 hover:border-emerald-300 hover:bg-emerald-50 dark:border-zinc-800 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/30",
                ].join(" ")}
                href={href}
                onClick={onNavigate}
              >
                <span className="font-medium">{node.title}</span>
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

function NavTree({
  depth = 0,
  nodes,
  onNavigate,
}: {
  depth?: number;
  nodes: NavNode[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul
      className={
        depth === 0
          ? "space-y-2"
          : "mt-2 space-y-1 border-l border-zinc-200 pl-3 dark:border-zinc-800"
      }
    >
      {nodes.map((node) => {
        const active = node.href === pathname;
        const activeBranch = containsPath(node, pathname);
        const linkClassName = [
          "block rounded-lg px-2.5 py-2.5 text-sm transition-colors",
          active
            ? "bg-emerald-50 font-medium text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100"
            : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
        ].join(" ");
        const label = node.href ? (
          <Link
            aria-current={active ? "page" : undefined}
            className={linkClassName}
            href={node.href}
            onClick={onNavigate}
          >
            {node.title}
          </Link>
        ) : (
          <span className="block px-2.5 py-2.5 text-sm font-medium text-zinc-950 dark:text-zinc-50">
            {node.title}
          </span>
        );

        if (node.children.length === 0) {
          return <li key={node.segment}>{label}</li>;
        }

        return (
          <li key={node.segment}>
            <details open={depth < 1 || activeBranch}>
              <summary
                className={[
                  "cursor-pointer rounded-lg px-2.5 py-2.5 text-sm font-medium transition-colors",
                  activeBranch
                    ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50"
                    : "text-zinc-950 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-900",
                ].join(" ")}
              >
                {node.title}
              </summary>
              {node.href ? (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={[
                    "mt-1 block rounded-lg px-2.5 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-emerald-50 font-medium text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100"
                      : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
                  ].join(" ")}
                  href={node.href}
                  onClick={onNavigate}
                >
                  Ringkasan
                </Link>
              ) : null}
              <NavTree
                depth={depth + 1}
                nodes={node.children}
                onNavigate={onNavigate}
              />
            </details>
          </li>
        );
      })}
    </ul>
  );
}

export function DocsNavContent({
  compact = false,
  nodes,
  onNavigate,
  searchAutoFocus = false,
  searchId,
}: DocsNavContentProps) {
  return (
    <div className={compact ? "space-y-5" : "space-y-6"}>
      <DocsSearch
        autoFocus={searchAutoFocus}
        id={searchId}
        onNavigate={onNavigate}
      />
      <ModuleList compact={compact} nodes={nodes} onNavigate={onNavigate} />
      <nav aria-label="Daftar semua materi" className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Semua Halaman
        </p>
        <NavTree nodes={nodes} onNavigate={onNavigate} />
      </nav>
    </div>
  );
}
