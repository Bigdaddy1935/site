import Image from "@/components/Assets/Image";
import NextLink from "@/components/Assets/NextLink";
import { Model } from "@/types";

export type CartType = "mostLikes" | "mostSales";
export type CartItemProps = {
  picture: string;
  title: string;
  count: number;
  type: Model;
  id: number;
  cartType?: CartType;
  course_id?: number;
};

export default function CartItem({
  picture,
  title,
  count,
  type,
  cartType = "mostLikes",
  id,
  course_id,
}: CartItemProps) {
  const getHref = () => {
    if (type === "article" || type === "course" || type === "product")
      return `/${type}/${type}-${id}`;

    if (
      type === "tv" ||
      type === "media" ||
      type === "kolbe" ||
      type === "podcast" ||
      type === "mahdyar"
    )
      return `/lessons/${course_id}-${id}`;

    return "#";
  };
  return (
    <NextLink
      href={getHref()}
      className="flex p-3 flex-col justify-between rounded-xl border border-hgray-300 dark:border-mdark-600"
    >
      <div className="relative h-[172px] p-2 w-full overflow-hidden rounded-xl">
        <Image
          src={picture}
          alt="title"
          fill
          className="rounded-xl object-contain"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <h3 className="my-2 w-full flex-1 text-nowrap overflow-hidden text-ellipsis text-base font-medium text-hgray-600 dark:text-text-dark-3">
          {title}
        </h3>

        <p className="flex items-center text-hgray-600 dark:text-hgray-200">
          {cartType === "mostLikes" ? (
            <span className="text-sm me-2 text-hgray-400">
              {"تعداد پسندیده ها:"}
            </span>
          ) : (
            <span className="text-sm me-2 text-hgray-400">
              {"تعداد خرید ها:"}
            </span>
          )}

          {count}
        </p>
      </div>
    </NextLink>
  );
}
