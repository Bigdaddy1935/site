'use client';
import Button from '@/components/Assets/Button';
import IconDownOpen from '@/components/Icons/IconDownOpen';
import IconLoading from '@/components/Icons/IconLoading';
import { selectUser } from '@/lib/reduxFeatures/authSlice';
import { useAppSelector } from '@/lib/reduxHooks';
import { useGetModelCommentsMutation } from '@/lib/services/admin';
import { useEffect, useMemo, useState } from 'react';
import { CommentItem as CommentItemType, Model } from '@/types/';
import AddCommentForm from '../AddCommentForm';
import CommentItem from '../CommentItem';
import { useComments } from '../CommentProvider';
import AdminTempComments from './AdminTempComments';

type Props = {
  id: number;
  model: Model;
};

function AdminComments(props: Props) {
  const { id, model } = props;
  const user = useAppSelector(selectUser);
  const [comments, setComments] = useState<CommentItemType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const { deletedItems } = useComments();
  const [getComments, { isLoading, isSuccess }] = useGetModelCommentsMutation();

  useEffect(() => {
    if (user?.approved === 1) handleFetch();
  }, [user]);
  const handleFetch = () => {
    getComments({
      id,
      model,
      page: currentPage + 1
    }).then(({ data, error }) => {
      if (!error) {
        setComments((prev) => (currentPage > 0 ? [...prev, ...data.data] : [...data.data]));
        setCurrentPage(data.current_page);
        if (data.current_page === data.last_page) setIsLastPage(true);
      }
    });
  };

  const commentsList = useMemo(
    () => (
      <>
        <AdminTempComments />
        {comments
          .filter((i) => !deletedItems.includes(i.id))
          .map((item) => (
            <CommentItem key={item.id} {...item} />
          ))}
      </>
    ),
    [deletedItems, comments]
  );
  return user?.approved === 1 ? (
    <div className="mt-6 flex flex-col gap-3">
      <AddCommentForm model={model} id={id} />

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

export default AdminComments;
