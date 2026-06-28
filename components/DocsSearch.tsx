"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useMemo, useState } from "react";

type SearchResult = {
  content: string;
  title: string;
  url: string;
};

type DocsSearchProps = {
  autoFocus?: boolean;
  id?: string;
  onNavigate?: () => void;
};

function excerpt(content: string): string {
  return content
    .replace(/^---[\s\S]*?---/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`[\]()|:-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 140);
}

export function DocsSearch({
  autoFocus = false,
  id,
  onNavigate,
}: DocsSearchProps) {
  const generatedId = useId();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputId = id ?? `docs-search-${generatedId.replace(/:/g, "")}`;
  const trimmed = useMemo(() => query.trim(), [query]);

  useEffect(() => {
    if (trimmed.length < 1) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/find-docs?q=${encodeURIComponent(trimmed)}`,
          {
            signal: controller.signal,
          },
        );
        if (!response.ok) {
          setResults([]);
          return;
        }
        setResults((await response.json()) as SearchResult[]);
      } catch (error) {
        if (!controller.signal.aborted) {
          setResults([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 180);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [trimmed]);

  return (
    <div className="space-y-2">
      <label
        className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
        htmlFor={inputId}
      >
        Cari Materi
      </label>
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
        />
        <input
          autoFocus={autoFocus}
          className="h-12 w-full rounded-xl border border-zinc-200/80 bg-zinc-50/50 backdrop-blur-xs pl-10 pr-3 text-base md:text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:text-zinc-50 dark:focus:bg-zinc-950 dark:focus:border-emerald-500 transition-all duration-200"
          id={inputId}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari modul, file, atau konsep"
          type="search"
          value={query}
        />
      </div>

      {trimmed.length >= 1 ? (
        <div className="max-h-80 overflow-y-auto rounded-xl border border-zinc-200/80 bg-white p-1 text-sm shadow-lg shadow-emerald-950/5 dark:border-zinc-800/80 dark:bg-zinc-950">
          {loading ? (
            <p className="px-3 py-3 text-zinc-500 dark:text-zinc-400">
              Mencari...
            </p>
          ) : results.length === 0 ? (
            <p className="px-3 py-3 text-zinc-500 dark:text-zinc-400">
              Tidak ada hasil.
            </p>
          ) : (
            <ul className="divide-y divide-zinc-100/50 dark:divide-zinc-900/50">
              {results.map((result) => (
                <li key={result.url}>
                  <Link
                    className="block rounded-lg px-3.5 py-2.5 transition-colors hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-zinc-700 hover:text-emerald-900 dark:text-zinc-300 dark:hover:text-emerald-100"
                    href={result.url}
                    onClick={() => {
                      setQuery("");
                      onNavigate?.();
                    }}
                  >
                    <span className="block font-semibold text-zinc-950 dark:text-zinc-50 text-[13px]">
                      {result.title}
                    </span>
                    <span className="mt-1 block max-h-12 overflow-hidden text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {excerpt(result.content)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
