import Image from "@/components/Assets/Image";
import NextLink from "@/components/Assets/NextLink";
import { imageLoaderData } from "@/constant/imageLoaderData";
import formatFullName from "@/lib/formatFullName";
import Link from "next/link";
import { useMemo } from "react";
import { CourseListItem } from "@/types/";
import CardFooter from "./CardFooter";
import IconArrowRightShort from "../Icons/IconArrowRightShort";
import IconArrowLeftShort from "../Icons/IconArrowLeftShort";

export default function CourseCard(props: CourseListItem) {
  const {
    picture,
    categories,
    course_title,
    id,
    lessons_count,
    course_teacher,
    bookmark,
    like,
    like_count,
    type,
  } = props;

  const typeslug = useMemo(
    () => (type === "club" ? "/club/club" : "/course/course"),
    [type, id]
  );

  const category = categories?.[0];
  return (
    <div className="overflow-hidden rounded-[1.5rem] border dark:border-mdark-400 border-solid shadow-md">
      <div className="p-3 rounded-xl overflow-hidden">
        <NextLink
          className="relative  w-full h-[14rem]  block"
          href={`${typeslug}-${id}`}
        >
          <Image
            blurDataURL={imageLoaderData}
            src={picture ?? "/temp-images/course-card.jpg"}
            fill
            className="object-contain rounded-xl"
            alt={""}
          />
        </NextLink>
      </div>

      <div className="relative -mt-1 rounded-xl bg-white p-5 dark:bg-mdark-600">
        {category && (
          <Link
            style={{
              borderColor: category?.color,
              color: category?.color,
            }}
            className="ml-1 inline-block rounded-md  border border-solid px-2 text-sm font-light"
            href={
              type === "club"
                ? "#"
                : `/courses/${category?.slug}-${category?.id}`
            }
          >{`${category?.name} `}</Link>
        )}

        <h3 className="mt-3 text-base font-medium text-hgray-500 dark:text-white">
          <NextLink href={`${typeslug}-${id}`}>{course_title}</NextLink>
        </h3>

        <p className="mb-4  text-sm text-hgray-400 dark:text-hgray-300">{""}</p>

        <span className="block text-sm  text-hgray-600 dark:text-hgray-300">{`تعداد درس: ${lessons_count}`}</span>

        <span className="block text-sm text-hgray-600 dark:text-hgray-300">
          استاد:
          <p className="inline-block">{formatFullName(course_teacher)}</p>
        </span>
        <div />

        <div className="my-3 h-0.5 bg-primary-700" />

        <NextLink
          className="flex leading-none justify-center items-center text-primary-700 gap-1 dark:text-text-dark-4"
          href={`${typeslug}-${id}`}
        >
          مشاهده بیشتر
          <IconArrowLeftShort width={32} height={32} />
        </NextLink>

        {/*  <CardFooter
          color={category?.color}
          id={id}
          bookmark={bookmark}
          like={like}
          like_count={like_count}
        /> */}
      </div>
    </div>
  );
}
