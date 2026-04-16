"use client";

import { useCallback, useSyncExternalStore } from "react";

function getHash(): string | null {
  if (typeof window === "undefined") return null;
  const raw = window.location.hash.replace(/^#/, "");
  return raw.length > 0 ? decodeURIComponent(raw) : null;
}

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function getServerSnapshot(): string | null {
  return null;
}

export function useHashRoute(): [string | null, (slug: string | null) => void] {
  const slug = useSyncExternalStore(subscribe, getHash, getServerSnapshot);

  const navigate = useCallback((next: string | null) => {
    if (typeof window === "undefined") return;
    const target = next
      ? `${window.location.pathname}${window.location.search}#${encodeURIComponent(next)}`
      : `${window.location.pathname}${window.location.search}`;
    window.history.pushState(null, "", target);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }, []);

  return [slug, navigate];
}
