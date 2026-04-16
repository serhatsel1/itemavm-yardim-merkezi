import type { Article } from "@/lib/types";
import { CategoryIcon, DislikeIcon, EyeIcon, LikeIcon } from "@/components/icons";
import { StatPill } from "./StatPill";

export function ArticleCard({
  article,
  onOpen,
}: {
  article: Article;
  onOpen: (slug: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(article.slug)}
      className="group flex h-full flex-col items-center gap-4.75 rounded-lg border border-white/10 bg-card p-4.75 text-center transition-colors duration-200 hover:border-white/20 hover:bg-white/6 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <CategoryIcon icon={article.icon} className="h-14.25 w-14.25 object-contain" />
      <div className="flex flex-col gap-3.25">
        <h3 className="text-[19px] font-semibold leading-normal text-text">
          {article.title}
        </h3>
        <p className="line-clamp-3 text-[13px] font-medium leading-[1.714] text-text-muted">
          {article.summary}
        </p>
      </div>
      <div className="mt-auto flex flex-wrap items-center justify-center gap-1.75">
        <StatPill icon={<EyeIcon className="h-full w-full" />} value={article.views} />
        <StatPill icon={<LikeIcon className="h-full w-full" />} value={article.likes} />
        <StatPill icon={<DislikeIcon className="h-full w-full" />} value={article.dislikes} />
      </div>
    </button>
  );
}
