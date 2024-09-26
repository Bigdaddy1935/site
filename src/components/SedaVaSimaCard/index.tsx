import Image from "@/components/Assets/Image";
import NextLink from "@/components/Assets/NextLink";
import { imageLoaderData } from "@/constant/imageLoaderData";
import { LessenItem } from "@/types/";
import CardFooter from "./CardFooter";
import IconArrowLeftShort from "../Icons/IconArrowLeftShort";

export default function SedaVaSimaCard(props: LessenItem) {
  const {
    picture,
    categories,
    teacher,
    id,
    bookmark,
    like,
    like_count,
    course_id,
    title,
  } = props;

  return (
    <div className="overflow-hidden rounded-xl shadow-md border dark:border-mdark-400 border-solid">
      <div className="relative w-full p-3">
        <NextLink
          className="relative md:h-[10rem] xl:h-[16rem] h-[16rem] rounded-2xl block"
          href={`/lessons/${course_id}-${id}`}
        >
          <Image
            blurDataURL={imageLoaderData}
            loading="eager"
            src={picture ?? "/temp-images/course-card.jpg"}
            fill
            className="object-contain rounded-xl"
            alt={""}
          />
        </NextLink>
      </div>

      <div className="relative  bg-white p-5 dark:bg-mdark-600">
        <h3 className="mt-3 text-base font-medium text-hgray-500 dark:text-white">
          <NextLink href={`/lessons/${course_id}-${id}`}>{title}</NextLink>
        </h3>

        <div className="my-3 h-0.5 bg-primary-700" />

        <NextLink
          className="flex leading-none justify-center items-center text-primary-700 gap-1 dark:text-text-dark-4"
          href={`/lessons/${course_id}-${id}`}
        >
          مشاهده بیشتر
          <IconArrowLeftShort width={32} height={32} />
        </NextLink>
        {/*  <CardFooter
          course_id={course_id}
          color={categories[0]?.color}
          id={id}
          bookmark={bookmark}
          like={like}
          like_count={like_count}
        /> */}
      </div>
    </div>
  );
}
