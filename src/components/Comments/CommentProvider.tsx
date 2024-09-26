"use client"
import { createContext, useContext, useState } from "react";
import { CommentItem, Model } from "@/types/";

type CommentReply = {
    commentId: number;
    modelType: Model;
    modelId: number
} | null
export type CommentsContextType = {
    commentReply: CommentReply;
    setCommentReply: (commentReply: CommentReply) => void;
    tempCommentReplies: CommentItem[];
    setTempCommentRepleies: (replies: CommentItem[]) => void;
    tempComments: CommentItem[];
    setTempComments: (comments: CommentItem[]) => void;
    deletedItems: number[];
    setDeletedItems: (items: number[]) => void;
}
export const CommentsContext = createContext<CommentsContextType>({
    commentReply: null,
    setCommentReply: (commentReply: CommentReply) => { },
    tempCommentReplies: [],
    setTempCommentRepleies: (replies: CommentItem[]) => { },
    tempComments: [],
    setTempComments: (comments: CommentItem[]) => { },
    deletedItems: [],
    setDeletedItems: (items: number[]) => { }
});


export const useComments = () => useContext(CommentsContext);
export default function CommentsProvider({ children }: { children: React.ReactNode }) {
    const [commentReply, setCommentReply] = useState<CommentReply | null>(null);
    const [tempCommentReplies, setTempCommentRepleies] = useState<CommentItem[]>([]);
    const [tempComments, setTempComments] = useState<CommentItem[]>([]);
    const [deletedItems, setDeletedItems] = useState<number[]>([])

    return (
        <CommentsContext.Provider value={{
            tempComments,
            setTempComments,
            tempCommentReplies,
            setTempCommentRepleies,
            commentReply,
            setCommentReply,
            deletedItems,
            setDeletedItems
        }}>
            {children}
        </CommentsContext.Provider>
    )
}