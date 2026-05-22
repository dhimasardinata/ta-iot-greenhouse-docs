import fs from "node:fs";
import path from "node:path";

import { create, insertMultiple, search } from "@orama/orama";
import matter from "gray-matter";

import { sourceFileDocHref } from "@/lib/source-links";

export type DocEntry = {
  content: string;
  description?: string;
  filePath: string;
  href: string;
  slug: string[];
  title: string;
};

export type NavNode = {
  children: NavNode[];
  href?: string;
  segment: string;
  title: string;
};

const docsRoot = path.join(process.cwd(), "src/content/docs");

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return walk(fullPath);
    }

    return entry.isFile() && /\.(md|mdx)$/.test(entry.name) ? [fullPath] : [];
  });
}

function titleFromSegment(segment: string): string {
  return segment
    .replace(/^\d+-/, "")
    .replace(
      /\.(mdx?|txt|cpp|h|hpp|js|ts|tsx|py|php|vue|xml|json|ini|sh|bat)$/g,
      "",
    )
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function slugFromFile(filePath: string): string[] {
  const relative = path.relative(docsRoot, filePath).replace(/\\/g, "/");
  const withoutExt = relative.replace(/\.(md|mdx)$/, "");
  const parts = withoutExt.split("/");

  if (parts.at(-1) === "index") {
    parts.pop();
  }

  return parts.filter(Boolean);
}

function hrefFromSlug(slug: string[]): string {
  return slug.length === 0
    ? "/docs"
    : `/docs/${slug.map(encodeURIComponent).join("/")}`;
}

function isIndexSlug(slug: string[]): boolean {
  const requested = path.join(docsRoot, ...slug);

  return [
    path.join(requested, "index.md"),
    path.join(requested, "index.mdx"),
  ].some((candidate) => fs.existsSync(candidate));
}

function readEntry(filePath: string): DocEntry {
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const slug = slugFromFile(filePath);
  const firstHeading = parsed.content.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const fallbackTitle = titleFromSegment(slug.at(-1) ?? "Dokumentasi");

  return {
    content: parsed.content,
    description:
      typeof parsed.data.description === "string"
        ? parsed.data.description
        : undefined,
    filePath,
    href: hrefFromSlug(slug),
    slug,
    title:
      typeof parsed.data.title === "string"
        ? parsed.data.title
        : (firstHeading ?? fallbackTitle),
  };
}

export function getAllDocEntries(): DocEntry[] {
  return walk(docsRoot)
    .map(readEntry)
    .sort((a, b) => a.slug.join("/").localeCompare(b.slug.join("/")));
}

export function getDocBySlug(slug: string[] = []): DocEntry | null {
  const normalized = slug.filter(Boolean);

  if (normalized.length === 0) {
    return getDocBySlug(["00-start-here"]);
  }

  const requested = path.join(docsRoot, ...normalized);
  const candidates = [
    path.join(requested, "index.md"),
    path.join(requested, "index.mdx"),
    `${requested}.md`,
    `${requested}.mdx`,
  ];

  const filePath = candidates.find((candidate) => fs.existsSync(candidate));
  return filePath ? readEntry(filePath) : null;
}

function createNode(segment: string): NavNode {
  return {
    children: [],
    segment,
    title: titleFromSegment(segment),
  };
}

export function getNavTree(): NavNode[] {
  const root = createNode("");

  for (const entry of getAllDocEntries()) {
    let current = root;

    entry.slug.forEach((segment, index) => {
      let child = current.children.find((node) => node.segment === segment);
      if (!child) {
        child = createNode(segment);
        current.children.push(child);
      }

      if (index === entry.slug.length - 1) {
        child.href = entry.href;
        child.title = entry.title;
      }

      current = child;
    });
  }

  const sortTree = (nodes: NavNode[]) => {
    nodes.sort((a, b) => a.segment.localeCompare(b.segment));
    nodes.forEach((node) => sortTree(node.children));
  };

  sortTree(root.children);
  return root.children;
}

export async function searchDocs(query: string): Promise<DocEntry[]> {
  const needle = query.trim().toLowerCase();
  if (needle.length < 2) {
    return [];
  }

  const entries = getAllDocEntries();
  const db = create({
    schema: {
      content: "string",
      href: "string",
      title: "string",
    },
  });

  await insertMultiple(
    db,
    entries.map((entry) => ({
      content: entry.content,
      href: entry.href,
      title: entry.title,
    })),
  );

  const results = await search(db, {
    limit: 25,
    properties: ["title", "content"],
    term: needle,
  });
  const byHref = new Map(entries.map((entry) => [entry.href, entry]));

  return results.hits
    .map((hit) => byHref.get(String(hit.document.href)))
    .filter((entry): entry is DocEntry => Boolean(entry));
}

export function normalizeDocHref(currentSlug: string[], href: string): string {
  const sourceDocHref = sourceFileDocHref(href);
  if (sourceDocHref) {
    return sourceDocHref;
  }

  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  const [rawPath, hash = ""] = href.split("#");
  const hashSuffix = hash ? `#${hash}` : "";
  const cleanPath = rawPath.replace(/\.(md|mdx)$/, "");

  if (cleanPath.startsWith("/")) {
    return cleanPath + hashSuffix;
  }

  const base = isIndexSlug(currentSlug)
    ? currentSlug
    : currentSlug.slice(0, -1);
  const parts = cleanPath.split("/").filter(Boolean);
  const resolved = [...base];

  for (const part of parts) {
    if (part === ".") continue;
    if (part === "..") {
      resolved.pop();
      continue;
    }
    resolved.push(part);
  }

  return hrefFromSlug(resolved) + hashSuffix;
}
