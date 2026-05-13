import { useEffect, useRef } from 'react';

/**
 * Equalizes the height of all .country-card elements inside the ref'd container.
 * Height is determined by the tallest natural card and applied as minHeight to all.
 * Re-runs whenever `deps` change and on every window resize.
 */
export function useEqualCardHeight(deps: unknown[]) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const equalize = () => {
      const grid = ref.current;
      if (!grid) return;

      const cards = Array.from(
        grid.querySelectorAll<HTMLElement>('.country-card')
      );
      if (!cards.length) return;

      // Reset so each card returns to its natural height before measuring
      cards.forEach(c => (c.style.minHeight = ''));

      // Defer measurement to the next frame so the browser finishes layout
      requestAnimationFrame(() => {
        let max = 0;
        cards.forEach(c => {
          max = Math.max(max, c.offsetHeight);
        });
        if (max > 0) {
          cards.forEach(c => (c.style.minHeight = `${max}px`));
        }
      });
    };

    equalize();
    window.addEventListener('resize', equalize);
    return () => window.removeEventListener('resize', equalize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
