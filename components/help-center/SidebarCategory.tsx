"use client";

import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import type { Category } from "@/lib/types";
import { CategoryIcon, ChevronDownIcon } from "@/components/icons";

export function SidebarCategory({
  category,
  expanded,
  activeSlug,
  onToggle,
  onSelect,
}: {
  category: Category;
  expanded: boolean;
  activeSlug: string | null;
  onToggle: (id: string) => void;
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="rounded-lg border border-white/5 bg-card">
      <button
        type="button"
        onClick={() => onToggle(category.id)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-3 rounded-lg p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span className="flex items-center gap-2.5">
          <CategoryIcon icon={category.icon} className="h-6 w-6 object-contain" />
          <span className="text-[16px] font-semibold leading-normal tracking-[-0.006em] text-text">
            {category.title}
          </span>
        </span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-text-muted"
        >
          <ChevronDownIcon className="h-[18px] w-[18px]" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden px-2 pb-2"
          >
            <div className="flex flex-col gap-1.75">
              {category.articles.map((article) => {
                const isActive = article.slug === activeSlug;
                return (
                  <li key={article.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(article.slug)}
                      className={clsx(
                        "w-full rounded-md p-2.5 text-left text-[14px] font-medium leading-[1.714] tracking-[-0.006em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                        isActive
                          ? "bg-active text-text"
                          : "text-text-muted hover:bg-white/5 hover:text-text"
                      )}
                    >
                      {article.title}
                    </button>
                  </li>
                );
              })}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
