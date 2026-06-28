"use client";

import { ChevronRight } from "lucide-react";
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
    <nav aria-label="Pilih modul dokumentasi" className="space-y-2.5">
      <div className="flex items-center gap-2 px-1">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Modul Utama
        </p>
      </div>
      <ul className={compact ? "grid grid-cols-1 gap-2" : "space-y-1.5"}>
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
                  "group flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-sm transition-all duration-200",
                  active
                    ? "border-emerald-500/80 bg-gradient-to-r from-emerald-50/80 to-teal-50/50 text-emerald-950 shadow-xs dark:border-emerald-500/50 dark:from-emerald-950/30 dark:to-teal-950/20 dark:text-emerald-50"
                    : "border-zinc-200/80 bg-white hover:border-emerald-500/30 hover:bg-emerald-50/20 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-emerald-400/20 dark:hover:bg-emerald-950/10",
                ].join(" ")}
                href={href}
                onClick={onNavigate}
              >
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                  {node.title}
                </span>
                <span className={[
                  "shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors",
                  active
                    ? "bg-emerald-500 text-white border-emerald-500 dark:bg-emerald-400 dark:text-zinc-950 dark:border-emerald-400"
                    : "bg-zinc-100 text-zinc-500 border-zinc-200/60 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800"
                ].join(" ")}>
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
          ? "space-y-1.5"
          : "mt-1.5 space-y-1 border-l border-zinc-200/80 pl-3.5 dark:border-zinc-800/80"
      }
    >
      {nodes.map((node) => {
        const active = node.href === pathname;
        const activeBranch = containsPath(node, pathname);
        const linkClassName = [
          "block rounded-lg px-2.5 py-2 text-sm transition-all duration-200",
          active
            ? "bg-emerald-50/80 font-semibold text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 shadow-xs border border-emerald-500/10"
            : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/40 dark:hover:text-zinc-200",
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
          <span className="block px-2.5 py-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {node.title}
          </span>
        );

        if (node.children.length === 0) {
          return <li key={node.segment}>{label}</li>;
        }

        return (
          <li key={node.segment}>
            <details className="group" open={depth < 1 || activeBranch}>
              <summary
                className={[
                  "flex items-center justify-between cursor-pointer list-none [&::-webkit-details-marker]:hidden rounded-lg px-2.5 py-2 transition-colors",
                  activeBranch
                    ? "bg-zinc-50 text-zinc-950 font-semibold dark:bg-zinc-900/60 dark:text-zinc-50"
                    : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900/40 dark:hover:text-zinc-50",
                ].join(" ")}
              >
                <span className="truncate">{node.title}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 group-open:rotate-90" />
              </summary>
              {node.href ? (
                <Link
                  aria-current={active ? "page" : undefined}
                  className={[
                    "mt-1 block rounded-lg px-2.5 py-2 text-sm transition-all duration-200",
                    active
                      ? "bg-emerald-50/80 font-semibold text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400 shadow-xs border border-emerald-500/10"
                      : "text-zinc-650 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900/40 dark:hover:text-zinc-200",
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
      <nav aria-label="Daftar semua materi" className="space-y-2.5">
        <div className="flex items-center gap-2 px-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Semua Halaman
          </p>
        </div>
        <NavTree nodes={nodes} onNavigate={onNavigate} />
      </nav>
    </div>
  );
}
