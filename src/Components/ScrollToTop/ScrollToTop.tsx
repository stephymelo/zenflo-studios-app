import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// On every navigation, scroll to the hash target when the URL has one and the
// element exists (for example /#about after the landing page mounts), and to
// the top of the page otherwise. Keying on location.key as well means a repeat
// click on the same section link still scrolls, as a native anchor would.
export const ScrollToTop = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, key]);

  return null;
};
