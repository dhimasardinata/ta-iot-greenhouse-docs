'use client';

import { useEffect, useId, useState } from 'react';
import mermaid from 'mermaid';

type MermaidDiagramProps = {
  chart: string;
};

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const rawId = useId();
  const id = `mermaid-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const [svg, setSvg] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'base',
      themeVariables: {
        background: 'transparent',
        primaryColor: '#ecfdf5',
        primaryBorderColor: '#047857',
        primaryTextColor: '#064e3b',
        lineColor: '#64748b',
        secondaryColor: '#f8fafc',
        tertiaryColor: '#f1f5f9',
      },
    });

    mermaid
      .render(id, chart)
      .then(({ svg: rendered }) => {
        if (!cancelled) {
          setSvg(rendered);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setSvg('');
          setError(err instanceof Error ? err.message : 'Diagram tidak bisa dirender.');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <figure className="my-6 overflow-hidden rounded border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30">
        <figcaption className="border-b border-red-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-red-700 dark:border-red-900 dark:text-red-300">
          Mermaid error
        </figcaption>
        <pre className="overflow-x-auto p-4 text-sm leading-6 text-red-900 dark:text-red-100">
          <code>{error}</code>
        </pre>
      </figure>
    );
  }

  return (
    <figure className="my-6 overflow-x-auto rounded border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      {svg ? (
        <div
          className="docs-mermaid"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div className="text-sm text-zinc-500 dark:text-zinc-400">Memuat diagram...</div>
      )}
    </figure>
  );
}
