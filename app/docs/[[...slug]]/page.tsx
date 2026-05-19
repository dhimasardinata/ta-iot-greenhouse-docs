import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { MarkdownView } from '@/components/MarkdownView';
import { getDocBySlug } from '@/lib/docs';

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug = [] } = await params;
  const page = getDocBySlug(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug = [] } = await params;
  const page = getDocBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-5xl">
      <MarkdownView content={page.content} slug={page.slug} />
    </article>
  );
}
