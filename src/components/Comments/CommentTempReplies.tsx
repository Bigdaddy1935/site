"use client"

import { selectUser } from '@/lib/reduxFeatures/authSlice';
import { useAppSelector } from '@/lib/reduxHooks';
import CommentItem from './CommentItem';
import { useComments } from './CommentProvider';

export default function CommentTempReplies({commentId} : {commentId : number}) {
    const { tempCommentReplies } = useComments();
    const user = useAppSelector(selectUser);
    return user ? (
        tempCommentReplies.filter(i=>i?.parent_id === commentId ).map(item => <div className='mt-3' key={item.id}>
            <CommentItem level={0} {...item} user={user} />
        </div>)
    ) : null;
}
