"use client"
import EmptyButton from "@/components/Assets/EmptyButton";
import IconLoading from "@/components/Icons/IconLoading";
import IconTrashOutline from "@/components/Icons/IconTrashOutline";
import { useRemoveCommentMutation } from "@/lib/services/admin";
import { useComments } from "../CommentProvider";

export default function RemoveBtn({ id }: { id: number }) {
    const [remove, { isLoading }] = useRemoveCommentMutation();
    const { setDeletedItems, deletedItems } = useComments();
    const handleRemove = () => {
        if (confirm("از حذف این کامنت مطمئن هستید؟")) {
            remove({ id }).then(({ error }) => !error && setDeletedItems([...deletedItems, id]))
        }
    }
    return (
        <EmptyButton
            onClick={handleRemove}
            className="text-sm text-rose-500 dark:text-rose-200">
            {isLoading ? <IconLoading width={18} height={18} /> : <IconTrashOutline width={18} height={18} />}

        </EmptyButton>
    )
}
