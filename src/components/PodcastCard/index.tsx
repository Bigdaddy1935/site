import Image from "@/components/Assets/Image";
import NextLink from "@/components/Assets/NextLink";
import { imageLoaderData } from "@/constant/imageLoaderData";
import Link from "next/link";
import { PodcastListItem } from "@/types/";
import CardFooter from "./CardFooter";
import AudioPlayer from "../Assets/AudioPlayer";

export default function PodcastCard(props: PodcastListItem) {
  const {
    bookmark,
    categories,
    course_id,
    id,
    teacher,
    title,
    url_video,
    like = false,
    like_count = 0,
    courses: { picture },
  } = props;

  const category = categories?.[0];
  return (
    <div className="relative p-2 bg-white dark:bg-mdark-600 flex items-start rounded-[1.25rem] shadow-[0_0_2px_2px_#0000001a]">
      <div className="w-[100px]">
        <div className="mb-3 w-full">
          <AudioPlayer id={id} src={url_video}  picture={picture ?? '/temp-images/course-card.jpg'} />
        </div>
        {/*  <div className="relative">
          <NextLink href={`/lessons/${course_id}-${id}`}>
            <Image
              blurDataURL={imageLoaderData}
              src={picture ?? '/temp-images/course-card.jpg'}
              width={100}
              height={60}
              className="rounded-xl object-center object-fill"
              alt={''}
            />
          </NextLink>
        </div> */}
        {/*  <CardFooter
          course_id={course_id}
          color={category?.color}
          id={id}
          bookmark={bookmark}
          like={like}
          like_count={like_count}
        /> */}
      </div>

      <div className="relative max-w-[70%] flex h-full flex-1 flex-col items-start rounded-xl bg-white pr-3 dark:bg-mdark-600">
        <div className="w-full">
          {categories && (
            <Link
              style={{
                borderColor: category?.color,
                color: category?.color,
              }}
              className="inline-block text-sm font-light"
              href={`/podcasts/${category?.slug}-${category?.id}`}
            >{`${category?.name} `}</Link>
          )}

          <span className="block text-xs font-light text-hgray-600 dark:text-hgray-300">
            استاد:
            <p className="inline-block pr-1"> {teacher}</p>
          </span>
        </div>

        <h3 className="mt-3  text-[13px] font-medium  text-hgray-500 dark:text-white">
          <NextLink className="w-[230px]  truncate inline-block" href={`/lessons/${course_id}-${id}`}>{title}</NextLink>
        </h3>
      </div>
    </div>
  );
}
