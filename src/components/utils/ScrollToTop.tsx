import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A component that scrolls the window to the top on every route change.
 * It uses the `useEffect` hook to listen for changes in the URL pathname.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // This effect runs every time the pathname changes
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // These lines are often added for better compatibility with older browsers
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null; // This component does not render any visible UI
}
