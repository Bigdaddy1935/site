"use client"

import EmptyButton from "@/components/Assets/EmptyButton";
import TextField from "@/components/Form/TextField";
import IconLoading from "@/components/Icons/IconLoading";
import { useReplyCommentMutation } from "@/lib/services/admin";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import BoxComment from "./BoxComment";
import { useComments } from "./CommentProvider";

type ReplyFormProps = {
    id: number
}
export default function ReplyForm(props: ReplyFormProps) {
    const { id } = props;
    const { commentReply, setCommentReply , tempCommentReplies , setTempCommentRepleies } = useComments();
    const [addReply, { isLoading, isSuccess , data }] = useReplyCommentMutation();
    const elementRef = useRef<HTMLDivElement>(null);
    const form = useForm();
    useEffect(() => {
        id === commentReply?.commentId && elementRef?.current && elementRef?.current?.scrollIntoView({ block: "center", behavior: "smooth", inline: "start" })
    }, [commentReply?.commentId]);
    const handleSubmit = (values: any) => {
        if (!commentReply) return;
        addReply({
            body: values.body,
            ...commentReply
        });
    }

    useEffect(() => {
        if (isSuccess) {
            setCommentReply(null);
            setTempCommentRepleies([data , ...tempCommentReplies])
        } 
    }, [isSuccess])
    return (
        commentReply?.commentId === id ? <div ref={elementRef}>
            <BoxComment className="mr-5">
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <p className="text-hgray-500 font-medium mb-6">ثبت پاسخ</p>
                        <TextField className="bg-white" rows={2} multiple name="body" required placeholder="متن پاسخ" />

                        <div className="flex gap-3 justify-end mt-4">
                            <EmptyButton
                                disabled={isLoading}
                                onClick={() => setCommentReply(null)}
                                className="text-rose-500 border border-solid border-rose-500 rounded-md py-1 px-3 hover:text-white hover:border hover:border-solid hover:bg-rose-500 transition-colors"
                                type="button">انصراف</EmptyButton>
                            <EmptyButton
                                disabled={isLoading}
                                className="text-primary-300 border border-solid border-primary-300 rounded-md py-1 px-3 hover:text-white hover:border hover:border-solid hover:bg-primary-300 transition-colors"
                                type="submit">{isLoading ? <IconLoading width={22} height={22} /> : "ثبت"}</EmptyButton>
                        </div>
                    </form>
                </FormProvider>
            </BoxComment>
        </div> : null
    )
}