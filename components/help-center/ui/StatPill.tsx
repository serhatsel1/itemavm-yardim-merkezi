import type { ReactNode } from "react";

export function StatPill({
  icon,
  value,
}: {
  icon: ReactNode;
  value: number | string;
}) {
  const formatted =
    typeof value === "number" ? value.toLocaleString("tr-TR") : value;
  return (
    <span className="inline-flex items-center gap-1.25 rounded-full bg-white/10 py-1.25 pl-1.25 pr-2 text-[13px] font-medium leading-[1.714] tracking-[-0.006em] text-text-muted">
      <span className="h-[17px] w-[17px] shrink-0">{icon}</span>
      {formatted}
    </span>
  );
}
