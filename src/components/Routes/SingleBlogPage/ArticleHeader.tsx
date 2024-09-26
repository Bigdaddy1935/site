import BoxButton from '@/components/Assets/BoxButton';
import Hidden from '@/components/Assets/Hidden';
import Image from '@/components/Assets/Image';
import ShareBtn from '@/components/Assets/ShareBtn';
import ToggleBookmarkBtn from '@/components/Assets/ToggleBookmarkBtn';
import ToggleWishlistBtn from '@/components/Assets/ToggleWishlistBtn';
import { imageData } from '@/constant/constants';
import Link from 'next/link';
import { BlogItem } from '@/types/';
import formatFullName from '@/lib/formatFullName';

export default function ArticleHeader(props: BlogItem) {
  const { title, like_count, fullname, categories, picture, bookmark, like, id } = props;
  const category = categories[0];

  return (
    <div className="mt-8 flex flex-col-reverse justify-between lg:flex-row">
      <div className="mt-3 flex-1 lg:w-[50%]">
        <Hidden hidden="max-lg">
          <div className="flex mb-4 items-center">
            <Link
              className="ml-3 h-8 w-[0] overflow-hidden rounded-xl px-2 text-center leading-8 text-transparent transition-all hover:w-[120px] hover:text-white"
              style={{
                backgroundColor: category?.color
              }}
              href={`/articles/${category?.slug}-${category?.id}`}
            >
              {categories[0]?.name}
            </Link>
            <h1 className="ml-4 text-xl font-semibold text-[#522014] dark:text-text-dark-2">{title}</h1>
          </div>
          <div className="flex gap-3">
            <BoxButton
              leftContent={
                <ToggleWishlistBtn
                  id={id}
                  like={like}
                  like_count={like_count}
                  model="article"
                  color={categories[0]?.color}
                />
              }
              flex1
              text={'پسندیدم'}
            />

            <BoxButton
              className="justify-center"
              text={''}
              leftContent={<ToggleBookmarkBtn bookmark={bookmark} id={id} model="article" />}
            />
          </div>
        </Hidden>

        <div className="mt-3 flex items-center gap-3">
          <div className="flex flex-1 flex-wrap justify-between  gap-3">
            <Hidden hidden="lg">
              <div className="flex w-full flex-shrink-0 flex-nowrap justify-between gap-3">
                <BoxButton
                  className="pl-0 max-lg:justify-center max-lg:py-2"
                  text={''}
                  leftContent={<ShareBtn />}
                  flex1
                />
                <BoxButton
                  className="pl-0 max-lg:justify-center"
                  text={''}
                  leftContent={<ToggleBookmarkBtn bookmark={bookmark} id={id} model="article" />}
                  flex1
                />
                <BoxButton
                  className="pl-0 max-lg:min-w-[84px] max-lg:flex-1 max-lg:justify-center"
                  text={''}
                  leftContent={
                    <ToggleWishlistBtn
                      id={id}
                      like={like}
                      like_count={like_count}
                      model="article"
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
                  {formatFullName(fullname)}
                </>
              }
              flex1
              endGradient
              showTextInMobile
              className="pl-0"
              gradiantColor={category?.color}
            />

            <Hidden hidden="max-lg">
              <BoxButton
                flex1
                className="w-full basis-auto"
                text={' ارسال با لینک مستقیم'}
                leftContent={<ShareBtn />}
              />
            </Hidden>
          </div>
        </div>
      </div>

      <div className=" flex-1 overflow-hidden  rounded-xl lg:w-[50%] lg:px-[5%]">
        <div className="relative h-[317px] w-full overflow-hidden rounded-xl ">
          <Image
            src={picture}
            fill
            alt={title}
            className="rounded-xl bg-transparent object-contain"
            blurDataURL={imageData}
          />
        </div>
      </div>

      <Hidden hidden="lg">
        <div className="flex items-center">
          <Link
            className="ml-3 h-8 w-[0] overflow-hidden rounded-xl px-2 text-center leading-8 text-transparent transition-all hover:w-[120px] hover:text-white"
            style={{
              backgroundColor: category?.color
            }}
            href={`/articles/${category?.slug}-${category?.id}`}
          >
            {categories[0]?.name}
          </Link>
          <h1 className="ml-4 text-xl font-semibold text-[#522014]">{title}</h1>
        </div>
      </Hidden>
    </div>
  );
}
