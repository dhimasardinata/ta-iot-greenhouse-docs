import './global.css';

import { RootProvider } from 'fumadocs-ui/provider/next';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'TA IoT Greenhouse Docs',
    template: '%s | TA IoT Greenhouse Docs',
  },
  description:
    'Dokumentasi Tugas Akhir IoT Greenhouse dari dasar sampai file-by-file.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
