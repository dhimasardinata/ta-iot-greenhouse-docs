"use client";

import { BookOpen, Code2, Layers, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { DocsNavContent } from "@/components/DocsNavContent";
import type { NavNode } from "@/lib/docs";

type MobileDocsNavProps = {
  nodes: NavNode[];
};

const quickLinks = [
  {
    href: "/docs/14-complete-file-walkthrough/coverage-report",
    icon: BookOpen,
    label: "Coverage",
  },
  {
    href: "/docs/99-generated/concept-coverage",
    icon: Layers,
    label: "Concepts",
  },
  {
    href: "/api-reference",
    icon: Code2,
    label: "API Reference",
  },
];

export function MobileDocsNav({ nodes }: MobileDocsNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        aria-controls="mobile-docs-nav"
        aria-expanded={open}
        className="inline-flex h-11 items-center gap-2 rounded-lg border border-zinc-200 px-3.5 text-sm font-medium text-zinc-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 active:bg-emerald-100 dark:border-zinc-800 dark:text-zinc-100 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/30"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Menu aria-hidden="true" className="h-5 w-5" />
        Navigasi
      </button>

      {open ? (
        <div
          aria-labelledby="mobile-docs-nav-title"
          aria-modal="true"
          className="fixed inset-0 z-50"
          role="dialog"
        >
          <button
            aria-label="Tutup navigasi"
            className="mobile-drawer-backdrop absolute inset-0 bg-zinc-950/45"
            onClick={() => setOpen(false)}
            type="button"
          />
          <aside
            className="mobile-drawer-panel absolute inset-y-0 left-0 flex w-[22rem] max-w-[calc(100vw-2rem)] flex-col border-r border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950"
            id="mobile-docs-nav"
          >
            <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
              <p
                className="text-sm font-semibold text-zinc-950 dark:text-zinc-50"
                id="mobile-docs-nav-title"
              >
                Navigasi Docs
              </p>
              <button
                aria-label="Tutup navigasi"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition-colors hover:bg-zinc-100 active:bg-zinc-200 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900"
                onClick={() => setOpen(false)}
                type="button"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            {/* Quick links for mobile-only access */}
            <div className="flex gap-2 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
              {quickLinks.map((link) => (
                <Link
                  className="flex flex-1 flex-col items-center gap-1.5 rounded-lg border border-zinc-200 px-2 py-2.5 text-center text-xs font-medium text-zinc-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 active:bg-emerald-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/30"
                  href={link.href}
                  key={link.href}
                  onClick={() => setOpen(false)}
                >
                  <link.icon aria-hidden="true" className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
              <DocsNavContent
                compact
                nodes={nodes}
                onNavigate={() => setOpen(false)}
                searchAutoFocus
                searchId="mobile-docs-search"
              />
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
