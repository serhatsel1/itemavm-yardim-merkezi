import clsx from "clsx";

function Bone({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-md bg-white/[0.06]",
        className
      )}
    />
  );
}

/* ── Article card skeleton ── */

export function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4.75 rounded-lg border border-white/10 bg-card p-4.75">
      <Bone className="h-14.25 w-14.25 rounded-full" />
      <div className="flex w-full flex-col items-center gap-3.25">
        <Bone className="h-5 w-3/4" />
        <div className="flex w-full flex-col items-center gap-1.5">
          <Bone className="h-3.5 w-full" />
          <Bone className="h-3.5 w-5/6" />
        </div>
      </div>
      <div className="mt-auto flex items-center gap-1.75">
        <Bone className="h-7 w-16 rounded-full" />
        <Bone className="h-7 w-14 rounded-full" />
        <Bone className="h-7 w-12 rounded-full" />
      </div>
    </div>
  );
}

/* ── Sidebar category skeleton ── */

export function SidebarCategorySkeleton() {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/5 bg-card p-4">
      <div className="flex items-center gap-2.5">
        <Bone className="h-6 w-6 rounded-full" />
        <Bone className="h-5 w-32" />
      </div>
      <Bone className="h-7.5 w-7.5 rounded-lg" />
    </div>
  );
}

/* ── Full page skeletons ── */

export function HomeViewSkeleton() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-7.5 py-7.5 lg:py-10">
      {/* Welcome skeleton */}
      <div className="flex flex-col items-center gap-7.5 lg:gap-10">
        <div className="flex flex-col items-center gap-5 lg:gap-10">
          <Bone className="h-15 w-15 rounded-2xl lg:h-17.5 lg:w-17.5" />
          <div className="flex flex-col items-center gap-6">
            <Bone className="h-7 w-72" />
            <div className="flex flex-col items-center gap-2">
              <Bone className="h-4 w-80" />
              <Bone className="h-4 w-64" />
            </div>
          </div>
        </div>
        <Bone className="h-14 w-65 rounded-lg" />
      </div>

      {/* Card grid skeleton */}
      <div className="grid w-full grid-cols-1 gap-3.75 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="flex w-full shrink-0 flex-col gap-5 lg:w-100">
      <Bone className="h-14 w-full rounded-lg" />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SidebarCategorySkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

/* ── Search loading overlay (cards) ── */

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid w-full grid-cols-1 gap-3.75 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}
