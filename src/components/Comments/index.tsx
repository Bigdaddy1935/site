"use client";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import { CommentItem as CommentItemType, Model } from "@/types/";
import { PaginateData } from "@/types/response";
import AddCommentForm from "./AddCommentForm";
import AdminComments from "./AdminComments";
import CommentItem from "./CommentItem";
import CommentsProvider from "./CommentProvider";
import MoreItemsBtn from "./MoreItemsBtn";

type Props = {
  id: number;
  comments?: PaginateData<CommentItemType>
  model: Model;
  type: string;
};
export default function Comments(props: Props) {
  const { id, model, comments, type } = props;
  const user = useAppSelector(selectUser);
  return (
    <CommentsProvider>
      {user && user?.approved === 1 ? (
        <AdminComments id={id} model={model} />
      ) : (
        <div className="flex flex-col gap-3 mt-6">
          <AddCommentForm model={model} id={id} />

          <MoreItemsBtn type={type} comments={comments} last_page={comments?.last_page ?? 2} id={id} />
        </div>
      )}
    </CommentsProvider>
  );
}
