"use server"
import { AxiosRequestConfig } from "axios";
import { cookies, headers } from "next/headers";
import { Post, Query } from "./axios";

export async function QueryWithCookie<T>(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<T | boolean> {
    const cookieStore = cookies();
    const serverToken = cookieStore.get('user_token');
    return Query<T>(url, {
        ...(config ?? null),
        headers: {
            Accept: "application/json",
            Authorization: serverToken ? `Bearer ${serverToken.value}` : undefined
        }
    })
}
export async function PostWithCookie<T>(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<T | boolean> {
    const cookieStore = cookies();
    const serverToken = cookieStore.get('user_token');

    return Post<T>(url, {
        ...(config ?? null),
        headers: {
            Accept: "application/json",
            Authorization: serverToken ? `Bearer ${serverToken.value}` : undefined
        }
    })
}


export async function getHomeUrl() {
    const headersList = headers();

    return headersList.get('host');

}