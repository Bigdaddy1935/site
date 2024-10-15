'use client';
import Hidden from '@/components/Assets/Hidden';
import BlogCart from '@/components/BlogCard';
import BlogCartSkeleton from '@/components/BlogCard/BlogCartSkeleton';
import IconLoading from '@/components/Icons/IconLoading';
import useGetMorOnScroll from '@/hooks/useGetMorOnScroll';
import React from 'react';

type Props = {
  lastPage: number;
  tags: string;
};

export default function ArticleMoreItem(props: Props) {
  const { lastPage, tags } = props;

  const { data, loading, showEnd, ref } = useGetMorOnScroll({
    route: { url: `/articles/from/tags`, method: 'post' },
    body: { tags }
  });

  return (
    <React.Fragment>
      {data.map((item) => (
        <BlogCart key={item.id} {...item} />
      ))}

      <div className="col-span-1 md:col-span-3 lg:col-span-4 xl:col-span-4" ref={ref} />

      {loading ? (
        <>
          <Hidden hidden="max-lg">
            <BlogCartSkeleton />
            <BlogCartSkeleton />
            <BlogCartSkeleton />
            <BlogCartSkeleton />
          </Hidden>

          <Hidden hidden="lg">
            <div className="col-span-1 flex items-center justify-center rounded-lg border border-solid border-hgray-400 p-3 text-hgray-400 md:col-span-3 lg:col-span-4 xl:col-span-4">
              <IconLoading width={22} height={22} className="ml-1" />
              <p className="text-sm font-medium">در حال دریافت موارد بیشتر</p>
            </div>
          </Hidden>
        </>
      ) : null}

      {showEnd ? (
        <p className="col-span-1 py-5 text-center text-xl font-medium text-hgray-600  dark:text-text-dark-2 md:col-span-3 lg:col-span-4 xl:col-span-4">
          محتوای بیشتری جهت نمایش وجود ندارد
        </p>
      ) : null}
    </React.Fragment>
  );
}
