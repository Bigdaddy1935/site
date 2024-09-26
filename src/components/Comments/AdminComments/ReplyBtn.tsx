"use client"
import EmptyButton from "@/components/Assets/EmptyButton";
import { Model } from "@/types/";
import { useComments } from "../CommentProvider";

type Props = {
    commentable_type: string,
    commentable_id : number,
    id: number
}
export default function ReplyBtn({ id , commentable_id , commentable_type }: Props) {
    const { setCommentReply } = useComments();
    const handleClick = () => {
      setCommentReply({
        commentId : id,
        modelId : commentable_id ,
        modelType : commentable_type.split('\\').pop()?.toLocaleLowerCase() as Model
      })
    }
    return (
        <div>
            <EmptyButton onClick={handleClick} className="text-sm text-primary-700 dark:text-white font-medium">پاسخ</EmptyButton>
        </div>
    )
}



