import clsx from "clsx";

export function Header({ className }: { className?: string }) {
  return (
    <header
      className={clsx(
        "flex h-[61px] items-center gap-6 rounded-t-lg border-b border-border-soft px-[24px]",
        className
      )}
    >
      <h2 className="text-[16px] font-bold leading-[20px] text-text">
        Yardım Merkezi
      </h2>
    </header>
  );
}
