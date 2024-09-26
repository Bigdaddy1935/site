import { Post } from "@/lib/axios";
import { CommentItem } from "@/types/";
import { PaginateData } from "@/types//response";

export async function getComments(id: number | string, type: string, page?: number) {
    return Post<PaginateData<CommentItem>>(`/comment/get/accepted/type/${id}`,
        {
            data: { type },
            params: { page }
        })

}

export async function getProductComments(id: number | string, page?: number) {
    return getComments(id, "App\\Models\\Product", page)
} 
export async function getCourseComments(id: number | string, page?: number) {
    'use server'
    return getComments(id, "App\\Models\\Course", page)
} 
export async function getArticleComments(id: number | string, page?: number) {
    'use server'
    return getComments(id, "App\\Models\\Article", page)
} 
export async function getLessonComments(id: number | string, page?: number) {
    return getComments(id, "App\\Models\\Lesson", page)
} 