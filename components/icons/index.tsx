import type { SVGProps } from "react";
import Image from "next/image";
import type { ArticleIconKey } from "@/lib/types";

type IconProps = SVGProps<SVGSVGElement>;

/* ── UI Icons (SVG — scalable, color-inheriting) ── */

export const SearchIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const ChevronDownIcon = (props: IconProps) => (
  <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4.5 6.75 9 11.25 13.5 6.75" stroke="currentColor" strokeWidth="1.575" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowLeftIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const EyeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const LikeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M7 10v10H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h3Zm0 0 4-7a2.5 2.5 0 0 1 2.5 2.5V9h5.2a2 2 0 0 1 1.98 2.29l-1.1 7a2 2 0 0 1-1.98 1.71H7"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

export const DislikeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M17 14V4h3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-3Zm0 0-4 7a2.5 2.5 0 0 1-2.5-2.5V15H5.3a2 2 0 0 1-1.98-2.29l1.1-7A2 2 0 0 1 6.4 4H17"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

export const SupportIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M4 12a8 8 0 0 1 16 0v5a3 3 0 0 1-3 3h-1v-7h4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 13v4a3 3 0 0 0 3 3h1v-7H4Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M1 1l11 11M12 1 1 12" stroke="currentColor" strokeWidth="1.575" strokeLinecap="round" />
  </svg>
);

export const GridIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="grid-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#9CFF9C" />
        <stop offset="100%" stopColor="#00B59C" />
      </linearGradient>
    </defs>
    <rect x="1.5" y="1.5" width="9" height="9" rx="2" fill="url(#grid-grad)" />
    <rect x="13.5" y="1.5" width="9" height="9" rx="2" fill="url(#grid-grad)" />
    <rect x="1.5" y="13.5" width="9" height="9" rx="2" fill="url(#grid-grad)" />
    <rect x="13.5" y="13.5" width="9" height="9" rx="2" fill="url(#grid-grad)" />
  </svg>
);

export const EmptySearchIcon = (props: IconProps) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="35" cy="35" r="24" stroke="#C2C2C2" strokeWidth="3" />
    <path d="M53 53l16 16" stroke="#C2C2C2" strokeWidth="3" strokeLinecap="round" />
    <path d="M28 30h14M28 38h8" stroke="#C2C2C2" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/* ── Raster Icons (PNG — from Figma assets) ── */

const ICON_SRC: Record<ArticleIconKey, string> = {
  info: "/icons/categories/genel.png",
  payment: "/icons/categories/odeme.png",
  publisher: "/icons/categories/yayinci.png",
  "cover-image": "/icons/categories/kapak.png",
  weapon: "/icons/articles/weapon.png",
  money: "/icons/articles/money.png",
  software: "/icons/articles/software.png",
  find: "/icons/articles/find.png",
} as const;

export function CategoryIcon({
  icon,
  className,
}: {
  icon: ArticleIconKey;
  className?: string;
}) {
  return (
    <Image
      src={ICON_SRC[icon]}
      alt=""
      width={60}
      height={60}
      className={className}
      draggable={false}
    />
  );
}

export function HeroQuestionIllustration({ className }: { className?: string }) {
  return (
    <Image
      src="/icons/hero-question.png"
      alt="Yardım Merkezi"
      width={70}
      height={70}
      className={className}
      draggable={false}
      priority
    />
  );
}
