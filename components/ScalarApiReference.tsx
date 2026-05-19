'use client';

import Script from 'next/script';
import { useCallback, useState } from 'react';

declare global {
  interface Window {
    Scalar?: {
      createApiReference: (
        selector: string,
        configuration: {
          hideDownloadButton?: boolean;
          layout?: string;
          showSidebar?: boolean;
          theme?: string;
          url: string;
        },
      ) => void;
    };
  }
}

export function ScalarApiReference() {
  const [ready, setReady] = useState(false);

  const mountScalar = useCallback(() => {
    const container = document.getElementById('scalar-api-reference');
    if (!container || container.dataset.scalarMounted === 'true' || !window.Scalar) {
      return;
    }

    container.dataset.scalarMounted = 'true';
    window.Scalar.createApiReference('#scalar-api-reference', {
      hideDownloadButton: false,
      layout: 'modern',
      showSidebar: true,
      theme: 'default',
      url: '/openapi.json',
    });
    setReady(true);
  }, []);

  return (
    <section className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-4 py-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-4 dark:border-zinc-800">
          <div>
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
              OpenAPI 3.1
            </p>
            <h1 className="text-2xl font-semibold tracking-normal">TA IoT Greenhouse API</h1>
          </div>
          <a
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-500 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-400 dark:hover:text-white"
            href="/openapi.json"
          >
            openapi.json
          </a>
        </div>
        <div
          aria-busy={!ready}
          className="min-h-[72vh] overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800"
          id="scalar-api-reference"
        >
          {!ready ? (
            <div className="flex min-h-[72vh] items-center justify-center px-6 text-sm text-zinc-600 dark:text-zinc-300">
              Memuat referensi API...
            </div>
          ) : null}
        </div>
      </div>
      <Script
        onLoad={mountScalar}
        onReady={mountScalar}
        src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"
        strategy="afterInteractive"
      />
    </section>
  );
}
