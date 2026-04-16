"use client";

import { useCallback, useEffect, useState } from "react";

const readHash = (): string | null => {
  if (typeof window === "undefined") return null;
  const raw = window.location.hash.replace(/^#/, "");
  return raw.length > 0 ? decodeURIComponent(raw) : null;
};

export function useHashRoute(): [string | null, (slug: string | null) => void] {
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    setSlug(readHash());
    const onChange = () => setSlug(readHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = useCallback((next: string | null) => {
    if (typeof window === "undefined") return;
    const target = next
      ? `${window.location.pathname}${window.location.search}#${encodeURIComponent(next)}`
      : `${window.location.pathname}${window.location.search}`;
    window.history.pushState(null, "", target);
    setSlug(next);
  }, []);

  return [slug, navigate];
}
