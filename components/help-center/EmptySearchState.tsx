import { useMemo } from "react";
import type { Article, HelpCenterData } from "@/lib/types";
import { EmptySearchIcon } from "@/components/icons";

const SUGGESTION_COUNT = 3;

function getPopularArticles(data: HelpCenterData, limit: number): Article[] {
  return data.categories
    .flatMap((c) => c.articles)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
}

export function EmptySearchState({
  query,
  helpCenterData,
  onOpenArticle,
}: {
  query: string;
  helpCenterData: HelpCenterData;
  onOpenArticle: (slug: string) => void;
}) {
  const suggestions = useMemo(
    () => getPopularArticles(helpCenterData, SUGGESTION_COUNT),
    [helpCenterData]
  );

  return (
    <div className="flex w-full flex-col items-center gap-8 py-6">
      {/* Empty illustration + message */}
      <div className="flex flex-col items-center gap-4 text-center">
        <EmptySearchIcon className="h-20 w-20 opacity-40" />
        <div className="flex flex-col gap-2">
          <p className="text-[18px] font-semibold text-text">
            &ldquo;{query}&rdquo; için sonuç bulunamadı
          </p>
          <p className="text-[14px] font-medium leading-[1.714] text-text-muted">
            Farklı bir anahtar kelime deneyin veya aşağıdaki popüler
            içeriklere göz atın.
          </p>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex w-full flex-col gap-4">
        <p className="text-[14px] font-semibold tracking-[-0.006em] text-text-muted">
          Bunları mı aramak istediniz?
        </p>
        <div className="flex flex-col gap-2">
          {suggestions.map((article) => (
            <button
              key={article.id}
              type="button"
              onClick={() => onOpenArticle(article.slug)}
              className="flex items-center gap-3 rounded-lg border border-white/5 bg-card p-3.5 text-left transition-colors hover:border-white/10 hover:bg-white/[0.04]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/[0.06]">
                <span className="text-[14px]">
                  {article.views >= 10000
                    ? "🔥"
                    : article.views >= 5000
                      ? "⭐"
                      : "📄"}
                </span>
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate text-[14px] font-medium text-text">
                  {article.title}
                </span>
                <span className="text-[12px] text-text-muted">
                  {article.views.toLocaleString("tr-TR")} görüntülenme
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
