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
    if (trimmed.length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(trimmed)}`,
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
          className="h-12 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-3 text-sm text-zinc-950 outline-none ring-0 placeholder:text-zinc-400 focus:border-emerald-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-emerald-400"
          id={inputId}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari modul, file, atau konsep"
          type="search"
          value={query}
        />
      </div>

      {trimmed.length >= 2 ? (
        <div className="max-h-80 overflow-y-auto rounded-lg border border-zinc-200 bg-white text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          {loading ? (
            <p className="px-3 py-3 text-zinc-500 dark:text-zinc-400">
              Mencari...
            </p>
          ) : results.length === 0 ? (
            <p className="px-3 py-3 text-zinc-500 dark:text-zinc-400">
              Tidak ada hasil.
            </p>
          ) : (
            <ul className="divide-y divide-zinc-100 dark:divide-zinc-900">
              {results.map((result) => (
                <li key={result.url}>
                  <Link
                    className="block px-3 py-3 hover:bg-zinc-100 active:bg-zinc-200 dark:hover:bg-zinc-900 dark:active:bg-zinc-800"
                    href={result.url}
                    onClick={() => {
                      setQuery("");
                      onNavigate?.();
                    }}
                  >
                    <span className="block font-medium text-zinc-950 dark:text-zinc-50">
                      {result.title}
                    </span>
                    <span className="mt-1 block max-h-10 overflow-hidden text-xs leading-5 text-zinc-600 dark:text-zinc-400">
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
