"use client";

export function Header({
  onOpenMobileSidebar,
}: {
  onOpenMobileSidebar: () => void;
}) {
  return (
    <header className="flex items-center justify-between gap-6 border-b border-border-soft px-6 py-5">
      <h2 className="text-[16px] font-bold leading-[1.3] text-text">
        Yardım Merkezi
      </h2>
      <button
        type="button"
        onClick={onOpenMobileSidebar}
        className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-card px-3 py-1.5 text-[13px] font-medium text-text-muted lg:hidden"
        aria-label="Kategorileri aç"
      >
        Kategoriler
      </button>
    </header>
  );
}
