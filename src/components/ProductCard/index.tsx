import Image from '@/components/Assets/Image';
import NextLink from '@/components/Assets/NextLink';
import { imageLoaderData } from '@/constant/imageLoaderData';
import formatFullName from '@/lib/formatFullName';
import { toLocalString } from '@/lib/number';
import Link from 'next/link';
import { ProductListItem } from '@/types/';
import CardFooter from './CardFooter';
import IconArrowLeftShort from '../Icons/IconArrowLeftShort';

export default function ProductCard(props: ProductListItem) {
  const {
    categories,
    id,
    bookmark,
    like,
    like_count,
    courses,
    tiny_desc,
    invoices_exists,
    paid,
    price,
    price_discount
  } = props;
  const { picture, course_title, lessons_count, course_teacher } = courses;
  const category = categories[0];
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] shadow-md border dark:border-mdark-400 border-solid">
      <div className="p-3 rounded-xl overflow-hidden">
        <NextLink className='relative block h-[14rem]' href={`/product/product-${id}`}>
          <Image
            placeholder="blur"
            blurDataURL={imageLoaderData}
            src={picture ?? '/temp-images/course-card.jpg'}
            fill
            className='object-contain  rounded-xl'
            alt={''}
          />
        </NextLink>
      </div>

      <div className="relative -mt-1 rounded-xl  bg-white p-5 dark:bg-mdark-600">
        {categories && (
          <Link
            style={{
              borderColor: category?.color,
              color: category?.color
            }}
            className="ml-1 inline-block rounded-md  border border-solid px-2 text-sm font-light"
            href={`/courses/${category?.slug}-${category?.id}`}
          >{`${category?.name} `}</Link>
        )}

        <h3 className="mt-3 text-base font-medium text-hgray-500 dark:text-white">
          <NextLink href={`/product/product-${id}`}>{course_title}</NextLink>
        </h3>

        {/*      {tiny_desc && <ContentBox maxHeight={45} open={false}>
                    <p className="!text-sm  text-hgray-400 dark:text-hgray-300 mb-4">
                        {tiny_desc.replace(/[^\w\s]/gi, '').replace(/<(?:.|\n)*?>/gm, '')}
                    </p>
                </ContentBox>} */}

        <span className="block text-sm text-hgray-600 dark:text-hgray-300">
          استاد:
          <p className="inline-block">{formatFullName(course_teacher)}</p>
        </span>
        <div className="flex items-end justify-between">
          <span className="mt-6 block text-sm  text-hgray-600 dark:text-hgray-300">{`تعداد درس: ${lessons_count}`}</span>

          {paid || invoices_exists ? (
            <p className="text-end text-lg font-medium text-primary-300 dark:text-text-dark-3">
              خریداری شده{' '}
            </p>
          ) : (
            <div>
              {price_discount ? (
                <p className="text-end text-lg font-medium leading-none  text-hgray-400 line-through dark:text-hgray-300">
                  {toLocalString(price)}{' '}
                  <span className="mr-2 inline-block text-xs font-light text-hgray-500 dark:text-white">
                    تومان
                  </span>
                </p>
              ) : null}
              <p className="text-end text-2xl font-semibold text-primary-300 dark:text-text-dark-3">
                {toLocalString(price_discount ?? price)}{' '}
                <span className="mr-2 inline-block text-sm font-light text-hgray-500 dark:text-white">
                  تومان
                </span>
              </p>
            </div>
          )}
        </div>
        <div />

        <div className="my-3 h-0.5 bg-primary-700" />

        <NextLink
          className="flex leading-none justify-center items-center text-primary-700 gap-1 dark:text-text-dark-4"
          href={`/product/product-${id}`}
        >
          مشاهده بیشتر
          <IconArrowLeftShort width={32} height={32} />
        </NextLink>
        {/* <CardFooter
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
