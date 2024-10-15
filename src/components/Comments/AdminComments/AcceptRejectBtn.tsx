"use client"
import EmptyButton from "@/components/Assets/EmptyButton";
import IconCheckLg from "@/components/Icons/IconCheckLg";
import IconLoading from "@/components/Icons/IconLoading";
import IconWindowClose from "@/components/Icons/IconWindowClose";
import { useToggleCommentStatusMutation } from "@/lib/services/admin";
import { useEffect, useState } from "react";
import { CommentStatus } from "@/types/";

type Props = {
    status: CommentStatus
    id: number
}
export default function AcceptRejectBtn(props: Props) {
    const { status, id } = props;
    const [toggleStatus, { isLoading, data }] = useToggleCommentStatusMutation();
    const [currentStatus, setCurrentStatus] = useState<CommentStatus>(status)
    const handleClick = () => {
        toggleStatus({
            id,
            status: currentStatus === 1 ? 'reject' : 'accept'
        });
    }

    useEffect(() => {
        if (data) {
            setCurrentStatus(data.status)
        }
    }, [data])

    return (
            <EmptyButton disabled={isLoading} onClick={handleClick}>
                {isLoading ? <IconLoading width={22} height={22} className="text-primary-700 dark:text-white" /> : <>
                    {currentStatus === 1 ?
                        <IconWindowClose width={22} height={22} className="text-rose-500 dark:text-rose-200" /> :
                        <IconCheckLg width={22} height={22} className="text-primary-700 dark:text-white" />}
                </>}
            </EmptyButton>
    )
}
