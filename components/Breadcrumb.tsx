"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function titleFromSegment(segment: string): string {
  return segment
    .replace(/^\d+-/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function Breadcrumb() {
  const pathname = usePathname();

  if (!pathname.startsWith("/docs")) return null;

  const segments = pathname
    .replace(/^\/docs\/?/, "")
    .split("/")
    .filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((segment, index) => ({
    href: `/docs/${segments.slice(0, index + 1).join("/")}`,
    label: titleFromSegment(decodeURIComponent(segment)),
  }));

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex items-center gap-1 overflow-x-auto text-xs text-zinc-500 lg:hidden dark:text-zinc-400"
    >
      <Link
        className="shrink-0 hover:text-zinc-950 dark:hover:text-zinc-50"
        href="/docs"
      >
        Docs
      </Link>
      {crumbs.map((crumb, index) => (
        <span className="flex items-center gap-1" key={crumb.href}>
          <ChevronRight aria-hidden="true" className="h-3 w-3 shrink-0" />
          {index === crumbs.length - 1 ? (
            <span className="truncate font-medium text-zinc-950 dark:text-zinc-50">
              {crumb.label}
            </span>
          ) : (
            <Link
              className="shrink-0 hover:text-zinc-950 dark:hover:text-zinc-50"
              href={crumb.href}
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
