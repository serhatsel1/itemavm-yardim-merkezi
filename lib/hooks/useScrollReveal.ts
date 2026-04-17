"use client";

import { type RefObject, useEffect, useRef, useState } from "react";

export function useScrollReveal(headerRef: RefObject<HTMLDivElement | null>) {
  const lastScrollY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const headerH = headerRef.current?.offsetHeight ?? 150;

        if (y <= headerH) {
          setHidden(false);
        } else {
          setHidden(y > lastScrollY.current);
        }

        lastScrollY.current = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerRef]);

  return hidden;
}
