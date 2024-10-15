"use client"
import { selectUser } from '@/lib/reduxFeatures/authSlice'
import { useAppSelector } from '@/lib/reduxHooks'
import { CommentItem } from '@/types/'
import AcceptRejectBtn from './AcceptRejectBtn'
import RemoveBtn from './RemoveBtn'
import ReplyBtn from './ReplyBtn'

export default function AdminReply(item: CommentItem) {
    const user = useAppSelector(selectUser)
    return (
        user?.approved === 1 ?
            <div className='absolute flex items-center gap-4 left-1 top-0'>
                <AcceptRejectBtn status={item?.status} id={item.id} />

                <RemoveBtn id={item?.id} />
                <ReplyBtn commentable_id={item?.commentable_id} commentable_type={item?.commentable_type} id={item?.id} />
            </div> : null
    )
}
