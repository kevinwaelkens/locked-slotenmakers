import { useEffect } from "react";

type HeadInput = {
  title: string;
  description: string;
  /** Absolute canonical URL */
  canonical?: string;
  /** Path within the site, e.g. '/tarieven' — used to compute canonical if not given */
  path?: string;
  ogImage?: string;
};

const SITE_URL = "https://locked-slotenmakers.be";

/**
 * Updates document.title + meta tags for the current route.
 * For full SSR/social-card support across all routes, switch to TanStack Start
 * or vike with prerendering — see README.md.
 */
export function useDocumentHead(input: HeadInput): void {
  useEffect(() => {
    document.title = input.title;

    setMeta("name", "description", input.description);

    const canonical = input.canonical ?? SITE_URL + (input.path ?? "/");
    setLink("canonical", canonical);

    setMeta("property", "og:title", input.title);
    setMeta("property", "og:description", input.description);
    setMeta("property", "og:url", canonical);
    if (input.ogImage) {
      setMeta("property", "og:image", input.ogImage);
      setMeta("name", "twitter:image", input.ogImage);
    }

    setMeta("name", "twitter:title", input.title);
    setMeta("name", "twitter:description", input.description);
  }, [input.title, input.description, input.canonical, input.path, input.ogImage]);
}

function setMeta(attr: "name" | "property", key: string, value: string): void {
  let el = document.querySelector(
    `meta[${attr}="${key}"]`,
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel: string, href: string): void {
  let el = document.querySelector(
    `link[rel="${rel}"]`,
  ) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}
