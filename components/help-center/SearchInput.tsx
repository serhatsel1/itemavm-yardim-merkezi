"use client";

import { CloseIcon, SearchIcon } from "@/components/icons";

export function SearchInput({
  value,
  onChange,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-14 items-center rounded-lg border border-white/10 bg-card px-4 ${className}`}
    >
      <SearchIcon className="h-4.5 w-4.5 shrink-0 text-text" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ara.."
        className="ml-3 w-full bg-transparent text-[15px] leading-[1.16] text-text placeholder:text-text-muted focus:outline-none"
        aria-label="Makalelerde ara"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-text-muted transition-colors hover:bg-white/20 hover:text-text"
          aria-label="Aramayı temizle"
        >
          <CloseIcon className="h-2.5 w-2.5" />
        </button>
      )}
    </div>
  );
}
