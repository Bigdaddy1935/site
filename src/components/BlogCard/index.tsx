import Image from "@/components/Assets/Image";
import NextLink from "@/components/Assets/NextLink";
import IconChevronLeft from "@/components/Icons/IconChevronLeft";
import formatFullName from "@/lib/formatFullName";
import Link from "next/link";
import { BlogListItem } from "@/types/";
import CardFooter from "./CardFooter";
import IconArrowLeftShort from "../Icons/IconArrowLeftShort";

export default function BlogCart(props: BlogListItem) {
  const {
    categories,
    fullname,
    title,
    id,
    picture,
    bookmark,
    like,
    like_count,
  } = props;
  const category = categories[0];
  return (
    <div className="overflow-hidden rounded-xl shadow-md border dark:border-mdark-400 border-solid">
      <div className="p-3">
        <NextLink
          className="block relative overflow-hidden h-[14rem]"
          href={`/article/content-${id}`}
        >
          <Image
            src={picture}
            fill
            className="object-contain object-center rounded-xl"
            alt={""}
          />
        </NextLink>
      </div>

      <div className="relative -mt-4 rounded-xl bg-white p-5 pb-3 dark:bg-mdark-400">
        {category && (
          <NextLink
            style={{
              borderColor: category?.color,
              color: category?.color,
            }}
            className="ml-1 inline-block rounded-md  border border-solid px-2 text-sm font-light"
            href={`/articles/${category?.slug}-${category?.id}`}
          >{`${category?.name} `}</NextLink>
        )}
        <div className="flex min-h-[115px] flex-col justify-between">
          <h3 className="mt-3 text-base font-medium text-hgray-500 dark:text-white">
            <NextLink href={`/article/content-${id}`}>{title}</NextLink>
          </h3>

          <p className="mb-4  text-justify text-sm text-hgray-400 dark:text-hgray-300">
            {""}
          </p>

          <span className="block text-sm text-hgray-600 dark:text-hgray-300 ">
            نویسنده:
            <p className="inline-block">{formatFullName(fullname)}</p>
          </span>

          <NextLink
            className="flex w-full items-center justify-end  text-sm text-hgray-600 dark:text-hgray-300 "
            href={`/article/content-${id}`}
          >
            مشاهده مقاله{" "}
            <IconChevronLeft
              width={18}
              height={18}
              className="text-primary-300"
            />
          </NextLink>
        </div>
        <div />

        <div className="my-3 h-0.5 bg-primary-700" />

        <NextLink
          className="flex leading-none justify-center items-center text-primary-700 gap-1 dark:text-text-dark-4"
          href={`/article/content-${id}`}
        >
          مشاهده بیشتر
          <IconArrowLeftShort width={32} height={32} />
        </NextLink>
     {/*    <CardFooter
          color={categories[0]?.color!}
          bookmark={bookmark}
          like={like}
          like_count={like_count}
          id={id}
        /> */}
      </div>
    </div>
  );
}
