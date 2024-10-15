'use client';
import Button from '@/components/Assets/Button';
import NextLink from '@/components/Assets/NextLink';
import BoxComment from '@/components/Comments/BoxComment';
import CommentItem from '@/components/Comments/CommentItem';
import { useComments } from '@/components/Comments/CommentProvider';
import Divider from '@/components/Divider';
import IconChevronLeft from '@/components/Icons/IconChevronLeft';
import IconDownOpen from '@/components/Icons/IconDownOpen';
import IconLoading from '@/components/Icons/IconLoading';
import { selectUser } from '@/lib/reduxFeatures/authSlice';
import { useAppSelector } from '@/lib/reduxHooks';
import { useGetAdminCommentsMutation } from '@/lib/services/admin';
import { useSearchParams } from 'next/navigation';
import { memo, useEffect, useMemo, useState } from 'react';
import {
    AdminCommentItem,
    BlogListItem,
    CourseListItem,
    KeyValue,
    LessenItem,
    ProductListItem
} from '@/types/';
import AdminCommentsListTabs, { ActiveTab } from './AdminCommentsListTabs';

const commentableTypes: KeyValue = {
  'App\\Models\\Product': 'محصول',
  'App\\Models\\Course': 'دوره',
  'App\\Models\\Article': 'مقاله',
  'App\\Models\\Lesson': 'درس'
};

const dispalycommentableType = (commentableType: string, commentable: any) => {
  let rightText = '';
  let linkText = '';
  let linkHref = '#';

  switch (commentableType) {
    case 'App\\Models\\Product':
      rightText = `محصول: ${(commentable as ProductListItem).courses?.course_title}`;
      linkHref = `/product/product-${(commentable as ProductListItem).id}`;
      break;
    case 'App\\Models\\Course':
      rightText = `دوره: ${(commentable as CourseListItem).course_title}`;
      linkHref = `/course/course-${(commentable as CourseListItem).id}`;
      break;
    case 'App\\Models\\Article':
      rightText = `مقاله: ${(commentable as BlogListItem).title}`;
      linkHref = `/article/content-${(commentable as BlogListItem).id}`;
      break;
    case 'App\\Models\\Lesson':
      rightText = `درس: ${(commentable as LessenItem).title}`;
      linkHref = `/lessons/${(commentable as LessenItem).course_id}-${(commentable as LessenItem).id}`;
      break;

    default:
      break;
  }

  return (
    <div className="flex flex-col pt-3 px-2 lg:flex-row items-stretch lg:items-center justify-between">
      <p className="text-hgray-600 dark:text-white">{rightText}</p>

      <NextLink className="flex items-center justify-end text-primary-700 dark:text-white" href={linkHref}>
        رفتن به {commentableTypes[commentableType]} <IconChevronLeft width={22} height={22} />
      </NextLink>
    </div>
  );
};

function AdminCommentsList() {
  const user = useAppSelector(selectUser);
  const [comments, setComments] = useState<AdminCommentItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const activeTabQuery = useSearchParams().get('tab') ?? 'all';
  const [activeTab, setActiveTab] = useState<ActiveTab>(
    activeTabQuery ? (activeTabQuery as ActiveTab) : 'all'
  );
  const { deletedItems } = useComments();
  const [getComments, { isLoading, isSuccess }] = useGetAdminCommentsMutation();
  useEffect(() => {
    if (user?.approved === 1 && currentPage === 0) handleFetch();
  }, [user, currentPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [activeTab]);
  const handleFetch = () => {
    getComments({
      page: currentPage + 1,
      type: activeTab as any
    }).then(({ data, error }) => {
      if (!error && data?.data.length > 0) {
        setComments((prev) => (currentPage > 0 ? [...prev, ...data.data] : [...data.data]));
        setCurrentPage(data.current_page);
        if (data.current_page === data.last_page) setIsLastPage(true);
      }
    });
  };

  const commentsList = useMemo(
    () => (
      <>
        {comments
          .filter((i) => !deletedItems.includes(i.id))
          .map((item) => (
            <BoxComment className='!p-0' key={item.id}>
              {dispalycommentableType(item.commentable_type, item.commentable)}
              <Divider space="my-2" />
              <CommentItem key={item.id} {...item} />
            </BoxComment>
          ))}
      </>
    ),
    [deletedItems, comments]
  );
  return user?.approved === 1 ? (
    <div className="mt-6 flex flex-col gap-3">
      <AdminCommentsListTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {commentsList}

      {!isLastPage ? (
        <Button
          disabled={isLoading}
          onClick={() => handleFetch()}
          fullWidth
          outlined
          rounded="lg"
          className="flex items-center justify-center  rounded-lg border-[3px] border-solid border-hgray-300  bg-transparent p-4 dark:border-mdark-400"
        >
          {isLoading ? (
            <IconLoading className="inline-block text-hgray-600" width={28} height={28} />
          ) : (
            <>
              <span className="inline-block text-lg font-semibold text-hgray-600 dark:font-medium dark:text-hgray-300">
                مشاهده بیشتر
              </span>
              <IconDownOpen className="mr-2 text-primary-300" width={28} height={28} />
            </>
          )}
        </Button>
      ) : null}
    </div>
  ) : null;
}

export default memo(AdminCommentsList);
