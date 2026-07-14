import { useEffect } from 'react';

const setMeta = (selector: string, attr: string, value: string) => {
  document.querySelector(selector)?.setAttribute(attr, value);
};

// Per-route title/description/canonical. Google indexes the JS-rendered values;
// non-JS crawlers fall back to the static ones in public/index.html.
export function useSeo(title: string, description: string, path: string) {
  useEffect(() => {
    const prefix = window.location.pathname.split('/')[1] === 'es' ? '/es' : '';
    const url = `https://zenflostudios.com${prefix}${prefix && path === '/' ? '' : path}`;
    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:url"]', 'content', url);
  }, [title, description, path]);
}
