const sourceProjectRoots = new Set(["gateway", "node"]);
const localProjectMarker = "/home/dhimasardinata/Dokumen/ta/";
const walkthroughRoot = "14-complete-file-walkthrough";

function sourcePathPartsFromFileUrl(href: string): string[] | null {
  const rawHref = href.split("#", 1)[0];
  if (!rawHref.startsWith("file://")) {
    return null;
  }

  let decodedPath: string;
  try {
    decodedPath = decodeURIComponent(new URL(rawHref).pathname);
  } catch {
    return null;
  }

  const markerIndex = decodedPath.indexOf(localProjectMarker);
  const relativePath =
    markerIndex >= 0
      ? decodedPath.slice(markerIndex + localProjectMarker.length)
      : decodedPath.replace(/^\/+/, "");
  const parts = relativePath.split("/").filter(Boolean);

  if (parts.length < 2 || !sourceProjectRoots.has(parts[0])) {
    return null;
  }

  return parts;
}

export function sourceFileDocSlugParts(href: string): string[] | null {
  const sourceParts = sourcePathPartsFromFileUrl(href);
  return sourceParts ? [walkthroughRoot, ...sourceParts] : null;
}

export function sourceFileDocHref(href: string): string | null {
  const slug = sourceFileDocSlugParts(href);
  return slug ? `/docs/${slug.map(encodeURIComponent).join("/")}` : null;
}
