import BoxButton from "@/components/Assets/BoxButton";
import Hidden from "@/components/Assets/Hidden";
import Image from "@/components/Assets/Image";
import LiquidProgressBar from "@/components/Assets/LinquidProgress";
import ShareBtn from "@/components/Assets/ShareBtn";
import ToggleBookmarkBtn from "@/components/Assets/ToggleBookmarkBtn";
import ToggleWishlistBtn from "@/components/Assets/ToggleWishlistBtn";
import { CourseItem } from "@/types/";

export default function CourseDetails(
  props: CourseItem & { product_id?: number }
) {
  const {
    course_title,
    course_teacher,
    lessons_count,
    like_count,
    like,
    id: course_id,
    categories,
    bookmark,
    courseProgress,
    type,
    product_id,
  } = props;

  const id = type === "product" && product_id ? product_id : course_id;
  return (
    <div className="mt-3">
      <Hidden hidden="max-lg">
        <div className="flex gap-3">
          <BoxButton
            text={course_title}
            leftContent={
              <ToggleBookmarkBtn bookmark={bookmark} id={id} model={type} />
            }
            flex1
          />

          <BoxButton
            leftContent={
              <ToggleWishlistBtn
                id={id}
                like={like}
                like_count={like_count}
                model={type}
                color={categories[0]?.color}
              />
            }
            text={"پسندیدم"}
          />
        </div>
      </Hidden>

      <div className="mt-3 flex items-center gap-3">
        <div className="h-[80px] w-[80px] rounded-full max-lg:flex-grow-0 lg:h-[120px] lg:w-[120px]">
          <LiquidProgressBar progress={courseProgress} />
        </div>

        <div className="flex flex-1 flex-wrap justify-between  gap-3">
          <Hidden hidden="lg">
            <div className="flex w-full flex-shrink-0 flex-nowrap justify-between gap-3">
              <BoxButton
                className="pl-0 max-lg:justify-center max-lg:py-2"
                text={""}
                leftContent={<ShareBtn />}
                flex1
              />
              <BoxButton
                className="pl-0 max-lg:justify-center"
                text={""}
                leftContent={
                  <ToggleBookmarkBtn bookmark={bookmark} id={id} model={type} />
                }
                flex1
              />
              <BoxButton
                className="pl-0 max-lg:min-w-[84px] max-lg:flex-1 max-lg:justify-center"
                text={""}
                leftContent={
                  <ToggleWishlistBtn
                    id={id}
                    like={like}
                    like_count={like_count}
                    model={type}
                    color={categories[0]?.color}
                  />
                }
                flex1
              />
            </div>
          </Hidden>

          <BoxButton
            text={
              <>
                <Hidden hidden="max-lg">مدرس </Hidden>
                {course_teacher}
              </>
            }
            flex1
            endGradient
            showTextInMobile
            gradiantColor={categories[0]?.color}
            className="pl-0"
            leftContent={
              <Image
                width={45}
                height={45}
                src={"/default-profile.png"}
                alt=""
                className="relative z-20 ml-1 rounded-full bg-hgray-500 dark:text-hgray-300"
              />
            }
          />

          <Hidden hidden="max-lg">
            <BoxButton
              text={
                <>
                  <Hidden hidden="max-lg">تعداد</Hidden> درس
                </>
              }
              className="max-lg:min-w-[45px] max-lg:justify-center max-lg:pl-0"
              leftContent={
                <span className="text-base text-hgray-400 dark:text-hgray-300 lg:ml-1">
                  {lessons_count}
                </span>
              }
            />
          </Hidden>

          <Hidden hidden="max-lg">
            <BoxButton
              flex1
              className="w-full basis-auto"
              text={" ارسال با لینک مستقیم"}
              leftContent={<ShareBtn />}
            />
          </Hidden>
        </div>
      </div>
    </div>
  );
}
