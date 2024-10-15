import NextLink from "@/components/Assets/NextLink";
import { Tag } from "@/types/";

export default function ArticleTagList({ items }: { items: Tag[] }) {
  return (
    <div className="flex items-center justify-start border-b-2 border-hgray-300 py-3 dark:border-mdark-400">
      {items?.map((item) => (
        <NextLink
          key={item.id}
          className="ml-2 rounded-xl bg-hgray-200 px-1 text-sm text-hgray-500 shadow-md shadow-black/45 dark:bg-mdark-400 dark:text-text-dark-4 lg:px-3 lg:text-base"
          href={`/articles/tags/${item.tag_name}-${item.id}`}
        >
          <span className="ml-1">#</span>
          {item.tag_name}
        </NextLink>
      ))}
    </div>
  );
}
