import { useId, type SVGProps } from "react";
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
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      fill="currentColor"
    />
  </svg>
);

export const LikeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11Zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66a4.8 4.8 0 0 0-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84A2.33 2.33 0 0 0 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15Z"
      fill="currentColor"
    />
  </svg>
);

export const DislikeIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M22 4h-2c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h2V4ZM2.17 11.12c-.11.25-.17.52-.17.8V13c0 1.1.9 2 2 2h5.5l-.92 4.65c-.05.22-.02.46.08.66.23.45.52.86.88 1.22L10 22l6.41-6.41c.38-.38.59-.89.59-1.42V6.34A2.33 2.33 0 0 0 14.66 4H6.56c-.71 0-1.37.37-1.73.97L2.17 11.12Z"
      fill="currentColor"
    />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M1 1l11 11M12 1 1 12" stroke="currentColor" strokeWidth="1.575" strokeLinecap="round" />
  </svg>
);

export function GridIcon(props: IconProps) {
  const id = useId();
  const gradId = `grid-grad-${id}`;
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9CFF9C" />
          <stop offset="100%" stopColor="#00B59C" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="9" height="9" rx="2" fill={`url(#${gradId})`} />
      <rect x="13.5" y="1.5" width="9" height="9" rx="2" fill={`url(#${gradId})`} />
      <rect x="1.5" y="13.5" width="9" height="9" rx="2" fill={`url(#${gradId})`} />
      <rect x="13.5" y="13.5" width="9" height="9" rx="2" fill={`url(#${gradId})`} />
    </svg>
  );
}

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
