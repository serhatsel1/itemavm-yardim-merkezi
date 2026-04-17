"use client";

import { useRef } from "react";
import clsx from "clsx";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import { ChevronDownIcon, GridIcon } from "@/components/icons";
import { SearchInput } from "../features/SearchInput";

export function MobileHeader({
  query,
  onQueryChange,
  onOpenDrawer,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  onOpenDrawer: () => void;
}) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerHidden = useScrollReveal(headerRef);

  return (
    <div
      ref={headerRef}
      className={clsx(
        "sticky top-0 z-30 flex flex-col gap-4 bg-bg px-4 pb-4 pt-4.75 transition-transform duration-300",
        headerHidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <SearchInput value={query} onChange={onQueryChange} className="bg-panel" />

      <button
        type="button"
        onClick={onOpenDrawer}
        className="flex items-center justify-between rounded-lg border border-white/5 bg-panel p-4"
      >
        <span className="flex items-center gap-2.5">
          <GridIcon className="h-6 w-6 text-text" />
          <span className="text-[16px] font-semibold leading-normal tracking-[-0.006em] text-text">
            Kategoriler
          </span>
        </span>
        <span className="flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-white/10">
          <ChevronDownIcon className="h-4.5 w-4.5 rotate-180 text-text-muted" />
        </span>
      </button>
    </div>
  );
}
