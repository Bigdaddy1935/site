import BoxButton from '@/components/Assets/BoxButton';
import Hidden from '@/components/Assets/Hidden';
import Image from '@/components/Assets/Image';
import LiquidProgressBar from '@/components/Assets/LinquidProgress';
import ShareBtn from '@/components/Assets/ShareBtn';
import ToggleBookmarkBtn from '@/components/Assets/ToggleBookmarkBtn';
import ToggleWishlistBtn from '@/components/Assets/ToggleWishlistBtn';
import { LessenItem } from '@/types';

export default function LessonInfo(props: LessenItem) {
  const {
    title,
    like_count,
    like,
    id,
    categories,
    bookmark,
    teacher,
    views,
    progress,
    courses: { type }
  } = props;
  return (
    <div className="mt-3">
      <Hidden hidden="max-lg">
        <div className="flex gap-3">
          <BoxButton
            text={title}
            leftContent={<ToggleBookmarkBtn bookmark={bookmark} id={id} model="lesson" />}
            flex1
          />

          <BoxButton
            leftContent={
              <ToggleWishlistBtn
                id={id}
                like={like}
                like_count={like_count}
                model="lesson"
                color={categories[0]?.color}
              />
            }
            text={'پسندیدم'}
          />
        </div>
      </Hidden>

      <div className="mt-3 flex items-center gap-3">
        {type === 'course' || type === 'product' ? (
          <div className="lg:h-[116px] lg:w-[116px] rounded-full max-lg:flex-grow-0">
            <LiquidProgressBar progress={Number(progress?.[0]?.percentage ?? 0)} />
          </div>
        ) : null}

        <div className="flex flex-1 flex-wrap justify-between  gap-3">
          <Hidden hidden="lg">
            <div className="flex w-full flex-shrink-0 flex-nowrap justify-between gap-3">
              <BoxButton
                className="pl-0 max-lg:justify-center max-lg:py-2"
                text={''}
                leftContent={<ShareBtn size="details" />}
                flex1
              />
              <BoxButton
                className="pl-0 max-lg:justify-center"
                text={''}
                leftContent={<ToggleBookmarkBtn bookmark={bookmark} id={id} model="course" />}
                flex1
              />
              <BoxButton
                text={''}
                className="pl-0 max-lg:min-w-[84px] max-lg:flex-1 max-lg:justify-center"
                leftContent={
                  <ToggleWishlistBtn
                    id={id}
                    like={like}
                    like_count={like_count}
                    model="lesson"
                    color={categories[0]?.color}
                  />
                }
                flex1
              />
            </div>
          </Hidden>

          <BoxButton
            text={`مدرس ${teacher}`}
            flex1
            endGradient
            showTextInMobile
            className="pl-0"
            leftContent={
              <Image
                width={45}
                height={45}
                src={'/default-profile.png'}
                alt=""
                className="relative z-20 ml-1 rounded-full bg-hgray-500 dark:text-hgray-300"
              />
            }
          />
          <Hidden hidden="max-lg">
            <BoxButton
              text={
                <>
                  <Hidden hidden="max-lg">تعداد</Hidden> بازدید
                </>
              }
              leftContent={
                <span className="text-base text-hgray-400 dark:text-hgray-300 lg:ml-1">
                  {views}
                </span>
              }
            />
          </Hidden>

          <Hidden hidden="max-lg">
            <BoxButton
              flex1
              className="w-full basis-auto"
              text={' ارسال با لینک مستقیم'}
              leftContent={<ShareBtn size="details" />}
            />
          </Hidden>
        </div>
      </div>
    </div>
  );
}
