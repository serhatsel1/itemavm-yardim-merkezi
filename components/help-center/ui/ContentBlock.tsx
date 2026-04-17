import Image from "next/image";
import type { ArticleContentBlock } from "@/lib/types";

const HEADING_CLASS =
  "text-[18px] font-semibold leading-[1.333] text-text md:text-[22px] md:leading-[1.091]";

export function ContentBlock({ block }: { block: ArticleContentBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className={HEADING_CLASS}>{block.text}</h2>;
    case "paragraph":
      return (
        <p className="text-[14px] font-medium leading-[1.714] text-text-muted">
          {block.text}
        </p>
      );
    case "image":
      return (
        <figure className="relative overflow-hidden">
          <Image
            src={block.src}
            alt={block.alt}
            width={960}
            height={400}
            className="w-full object-cover"
          />
        </figure>
      );
  }
}
