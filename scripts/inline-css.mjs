// Inline the prerendered <link rel="stylesheet" href="/assets/app-*.css">
// directly as a <style> tag in every HTML page.
//
// Why: Lighthouse identifies the Tailwind CSS bundle (~6 KB gzipped) as the
// only render-blocking resource. For first-page-load — which is what Lighthouse
// measures and what 99 % of organic visitors get — eliminating the round trip
// trumps the loss of cross-page caching, because users on a marketing site
// rarely navigate to a second page.
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const ROOT = "dist/client";
// Match Vite's hashed CSS link, including the `data-precedence="default"` attr
// that React's renderer emits for this style.
const CSS_LINK_RE =
  /<link rel="stylesheet" href="(\/assets\/[^"]+\.css)"[^>]*>/g;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const cssCache = new Map();
async function loadCss(href) {
  if (cssCache.has(href)) return cssCache.get(href);
  const css = await readFile(join(ROOT, href), "utf8");
  cssCache.set(href, css);
  return css;
}

let count = 0;
for await (const file of walk(ROOT)) {
  if (!file.endsWith(".html")) continue;
  const html = await readFile(file, "utf8");
  const matches = [...html.matchAll(CSS_LINK_RE)];
  if (matches.length === 0) continue;

  let updated = html;
  for (const m of matches) {
    const css = await loadCss(m[1]);
    updated = updated.replace(m[0], `<style>${css}</style>`);
  }
  await writeFile(file, updated);
  count++;
}

console.log(`[inline-css] inlined CSS into ${count} HTML file(s)`);
