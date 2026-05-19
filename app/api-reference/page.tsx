import type { Metadata } from 'next';

import { ScalarApiReference } from '@/components/ScalarApiReference';

export const metadata: Metadata = {
  title: 'API Reference',
  description: 'OpenAPI reference untuk endpoint utama sistem TA IoT Greenhouse.',
};

export default function ApiReferencePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <ScalarApiReference />
    </main>
  );
}
