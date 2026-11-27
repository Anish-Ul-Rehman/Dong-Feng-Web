import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const STICKY_HEADER_OFFSET = 84;

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - STICKY_HEADER_OFFSET;
          window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
        }
      }, 60);
      return () => clearTimeout(timer);
    }

    // Jump immediately to the top on route changes so full top sections are always visible
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    return undefined;
  }, [pathname, hash]);

  return null;
}
