import { branchUrl, normalizeBase } from "./branchPattern";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsString(value: string): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export interface RedirectHtmlOptions {
  title: string;
  href: string;
  label: string;
}

export function redirectHtml(options: RedirectHtmlOptions): string {
  const href = escapeHtml(options.href);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(options.title)}</title>
<link rel="canonical" href="${href}" />
<script>
  location.replace(${jsString(options.href)} + location.search + location.hash);
</script>
</head>
<body>
<noscript><a href="${href}">${escapeHtml(options.label)}</a></noscript>
</body>
</html>
`;
}

export function rootRedirectHtml(base: string, primary: string): string {
  return redirectHtml({
    title: "Integrated Dynamics docs",
    href: branchUrl(base, primary),
    label: `Continue to ${primary}`,
  });
}

export function versionRedirectHtml(base: string, version: string): string {
  const href = `${normalizeBase(base)}${version}/main/`;
  return redirectHtml({
    title: `${version} — Integrated Dynamics docs`,
    href,
    label: `Continue to ${version}/main`,
  });
}
