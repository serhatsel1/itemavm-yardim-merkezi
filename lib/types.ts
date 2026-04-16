export type CategoryIconKey =
  | "info"
  | "payment"
  | "publisher"
  | "cover-image";

export type ArticleContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; src: string; alt: string };

export interface Article {
  id: string;
  slug: string;
  categoryId: string;
  title: string;
  summary: string;
  content: ArticleContentBlock[];
  views: number;
  likes: number;
  dislikes: number;
}

export interface Category {
  id: string;
  title: string;
  icon: CategoryIconKey;
  articles: Article[];
}

export interface HelpCenterData {
  categories: Category[];
}
