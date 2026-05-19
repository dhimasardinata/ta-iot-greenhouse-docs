import { searchDocs } from '@/lib/docs';

export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q') ?? '';
  const results = searchDocs(query).map((entry) => ({
    title: entry.title,
    url: entry.href,
    content: entry.content.slice(0, 240),
  }));

  return Response.json(results);
}
