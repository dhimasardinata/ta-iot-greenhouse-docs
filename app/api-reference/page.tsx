import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { ScalarApiReference } from '@/components/ScalarApiReference';

export const metadata: Metadata = {
  title: 'API Reference',
  description: 'OpenAPI reference untuk endpoint utama sistem TA IoT Greenhouse.',
};

export default function ApiReferencePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Mobile-friendly header with back navigation */}
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95 lg:hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          <Link
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-zinc-200 px-3.5 text-sm font-medium text-zinc-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 active:bg-emerald-100 dark:border-zinc-800 dark:text-zinc-100 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/30"
            href="/docs"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Docs
          </Link>
          <span className="min-w-0 truncate text-sm font-semibold text-zinc-950 dark:text-zinc-50">
            API Reference
          </span>
        </div>
      </header>
      <ScalarApiReference />
    </main>
  );
}
