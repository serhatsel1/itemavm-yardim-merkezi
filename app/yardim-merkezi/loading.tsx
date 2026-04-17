import {
  HomeViewSkeleton,
  SidebarSkeleton,
} from "@/components/help-center/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen w-full">
      {/* Mobile skeleton */}
      <div className="min-h-screen bg-bg px-4 pt-20 md:hidden">
        <div className="rounded-lg bg-panel p-4">
          <HomeViewSkeleton />
        </div>
      </div>

      {/* Desktop skeleton */}
      <div className="hidden min-h-screen items-start justify-center bg-bg px-6 py-13 md:flex">
        <div className="w-full max-w-373.5 overflow-hidden rounded-lg bg-panel">
          <div className="flex h-[61px] items-center gap-6 rounded-t-lg border-b border-border-soft px-[24px]">
            <div className="h-5 w-32 animate-pulse rounded bg-white/5" />
          </div>
          <div className="flex items-stretch gap-5 p-5">
            <SidebarSkeleton />
            <div className="w-0.5 shrink-0 bg-border-soft" />
            <div className="flex min-w-0 flex-1 justify-center">
              <HomeViewSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
