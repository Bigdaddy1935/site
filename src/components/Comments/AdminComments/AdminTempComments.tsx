"use client"
import { selectUser } from '@/lib/reduxFeatures/authSlice';
import { useAppSelector } from '@/lib/reduxHooks';
import CommentItem from '../CommentItem';
import { useComments } from '../CommentProvider';

export default function AdminTempComments() {
    const { tempComments, deletedItems } = useComments();
    const user = useAppSelector(selectUser);
    return (
        user ? tempComments
            .filter(i => !deletedItems.includes(i.id))
            .map(item => <CommentItem key={item.id} {...item} user={user} />) : null
    )
}
