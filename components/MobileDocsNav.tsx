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
        className="inline-flex h-9 items-center gap-2 rounded-xl border border-zinc-200/80 bg-zinc-50/50 backdrop-blur-sm px-4 text-xs font-semibold text-zinc-700 shadow-sm transition-all duration-200 hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-600 active:scale-95 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:text-zinc-300 dark:hover:border-emerald-500/30 dark:hover:bg-emerald-500/5 dark:hover:text-emerald-400"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Menu aria-hidden="true" className="h-4.5 w-4.5" />
        Menu
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
            className="mobile-drawer-backdrop absolute inset-0 bg-zinc-950/40 backdrop-blur-xs"
            onClick={() => setOpen(false)}
            type="button"
          />
           <aside
            className="mobile-drawer-panel absolute inset-0 flex w-full max-w-full flex-col bg-white dark:bg-zinc-950"
            id="mobile-docs-nav"
          >
            {/* Branded Drawer Header */}
            <div className="flex items-center justify-between gap-3 border-b border-zinc-100 px-5 py-4 dark:border-zinc-900">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-sm shadow-md shadow-emerald-500/20 dark:bg-emerald-500">
                  G
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold leading-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">
                    IoT Greenhouse
                  </h3>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                    Dokumentasi & Panduan
                  </p>
                </div>
              </div>
              <button
                aria-label="Tutup navigasi"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200/80 bg-zinc-50 text-zinc-500 transition-all duration-200 hover:border-zinc-300 hover:text-zinc-800 hover:rotate-90 active:scale-95 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-750 dark:hover:text-zinc-200"
                onClick={() => setOpen(false)}
                type="button"
              >
                <X aria-hidden="true" className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Quick Links with premium grid cards */}
            <div className="grid grid-cols-3 gap-2 border-b border-zinc-100 px-5 py-4 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-900/10">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    className="group flex flex-col items-center gap-2 rounded-xl border border-zinc-200/80 bg-white p-2.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:shadow-md hover:shadow-emerald-500/5 active:translate-y-0 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-emerald-400/30"
                    href={link.href}
                    key={link.href}
                    onClick={() => setOpen(false)}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-500 group-hover:text-white dark:bg-emerald-950/40 dark:text-emerald-400 dark:group-hover:bg-emerald-500 dark:group-hover:text-white">
                      <Icon aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-600 group-hover:text-emerald-600 dark:text-zinc-300 dark:group-hover:text-emerald-400">
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 custom-scrollbar">
              <DocsNavContent
                compact
                nodes={nodes}
                onNavigate={() => setOpen(false)}
                searchId="mobile-docs-search"
              />
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
