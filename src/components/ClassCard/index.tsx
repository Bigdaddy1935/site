import Image from "@/components/Assets/Image";
import LiquidProgressBar from "@/components/Assets/LinquidProgress";
import NextLink from "@/components/Assets/NextLink";
import ToggleBookmarkBtn from "@/components/Assets/ToggleBookmarkBtn";
import ToggleWishlistBtn from "@/components/Assets/ToggleWishlistBtn";
import { imageData } from "@/constant/constants";
import formatFullName from "@/lib/formatFullName";
import { LessenItem } from "@/types";
import Link from "next/link";


export default function ClassCard(props : LessenItem) {
      const { picture, categories, title, id , teacher , bookmark , like , like_count , progress , courses} = props;

     const category = categories?.[0]


    return (
        <div className="rounded-xl shadow-md overflow-hidden relative group border dark:border-mdark-400 border-solid">
            <div className="relative h-[13rem]">
                <NextLink href={`/course/course-${34}`}>
                    <Image  blurDataURL={imageData} src={ picture ??  '/temp-images/course-card.jpg'} fill className="object-contain" alt={""} />
                </NextLink>
            </div>


            <div className="relative flex flex-col rounded-xl h-[180px] -mt-2 bg-white dark:bg-mdark-600 p-5 pt-2">
                {category &&
                    <Link style={{
                        color: category?.color
                    }} className="text-lg inline-block font-medium"
                        href={`/courses/${category?.slug}-${category?.id}`}>{`${category?.name} `}</Link>
                }


                <h3 className="text-lg font-medium text-hgray-600 dark:text-white mt-2">
                    <NextLink href={`/course/course-${12}`}>
                        {title}
                    </NextLink>
                </h3>

                <div className="flex-1 flex flex-col justify-between">
                    <span className="block text-sm  text-hgray-600 dark:text-hgray-300">{`دوره: ${courses?.course_title}`}</span>

                    <span className="block text-sm text-hgray-600 dark:text-hgray-300">
                        استاد:
                        <Link href={'#'}>
                            {formatFullName(teacher)}
                        </Link>
                    </span>
                </div>
            </div>
          {/*   <div className="absolute left-2 bottom-2">
                <LiquidProgressBar progress={Number(progress[0]?.percentage ?? 0)} />
            </div> */}

          {/*   <div className="flex flex-col absolute top-3 gap-2  p-1 rounded-md left-3 justify-center items-end">
                <ToggleBookmarkBtn bookmark={bookmark} id={id} model="lesson" />
                <ToggleWishlistBtn like_count={like_count} like={like} id={id} model="lesson" />
            </div> */}
        </div>
    )
}
