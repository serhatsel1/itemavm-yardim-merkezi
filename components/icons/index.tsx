import type { SVGProps } from "react";
import type { CategoryIconKey } from "@/lib/types";

type IconProps = SVGProps<SVGSVGElement>;

export const SearchIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
    <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const ChevronDownIcon = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* Hero illustration — colorful gradient bubbles echoing the Figma design */
export const HeroQuestionIllustration = (props: IconProps) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="hq1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#A274BF" />
        <stop offset="1" stopColor="#1F3596" />
      </linearGradient>
      <linearGradient id="hq2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FEF0AE" />
        <stop offset="1" stopColor="#FAC600" />
      </linearGradient>
      <linearGradient id="hq3" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#EAF9FA" />
        <stop offset="1" stopColor="#B3DAFE" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="42" fill="url(#hq1)" />
    <circle cx="92" cy="32" r="14" fill="url(#hq2)" />
    <circle cx="24" cy="86" r="10" fill="url(#hq3)" />
    <text
      x="60"
      y="74"
      textAnchor="middle"
      fontFamily="inherit"
      fontSize="46"
      fontWeight="700"
      fill="#ffffff"
    >
      ?
    </text>
  </svg>
);

/* Category illustrations — colorful gradient glyphs */
const CategoryInfo = (props: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="ci1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#62D0E9" />
        <stop offset="1" stopColor="#0162FF" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="26" fill="url(#ci1)" />
    <circle cx="32" cy="20" r="3" fill="#fff" />
    <rect x="29" y="27" width="6" height="20" rx="3" fill="#fff" />
  </svg>
);

const CategoryPayment = (props: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="cp1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FEF0AE" />
        <stop offset="1" stopColor="#E39A2C" />
      </linearGradient>
    </defs>
    <rect x="6" y="14" width="52" height="36" rx="6" fill="url(#cp1)" />
    <rect x="6" y="22" width="52" height="6" fill="#604104" />
    <rect x="12" y="36" width="18" height="4" rx="2" fill="#604104" />
  </svg>
);

const CategoryPublisher = (props: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="cu1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#9DE962" />
        <stop offset="1" stopColor="#00DC7F" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="26" fill="url(#cu1)" />
    <circle cx="32" cy="26" r="8" fill="#fff" />
    <path d="M16 48c3-8 10-12 16-12s13 4 16 12" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const CategoryCoverImage = (props: IconProps) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="cc1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#BE62E9" />
        <stop offset="1" stopColor="#A274BF" />
      </linearGradient>
    </defs>
    <rect x="6" y="12" width="52" height="40" rx="6" fill="url(#cc1)" />
    <circle cx="22" cy="26" r="5" fill="#fff" />
    <path d="M10 46l14-14 12 10 8-6 10 10v2H10z" fill="#fff" />
  </svg>
);

export function CategoryIcon({
  icon,
  className,
}: {
  icon: CategoryIconKey;
  className?: string;
}) {
  switch (icon) {
    case "info":
      return <CategoryInfo className={className} />;
    case "payment":
      return <CategoryPayment className={className} />;
    case "publisher":
      return <CategoryPublisher className={className} />;
    case "cover-image":
      return <CategoryCoverImage className={className} />;
  }
}
