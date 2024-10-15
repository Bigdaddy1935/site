import {
  Middleware,
  MiddlewareAPI,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/lib/store";
import { toast } from "react-toastify";
import {
  BlogItem,
  BlogListItem,
  Category,
  CourseItem,
  CourseListItem,
  LessenItem,
  NewsItem,
  PodcastListItem,
  ProductListItem,
  SearchData,
  Teacher,
} from "@/types/";
import { url } from "inspector";
import { PaginateData } from "@/types/response";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
type CartData =
  | BlogListItem
  | CourseListItem
  | PodcastListItem
  | ProductListItem;
export type About = { title: string; desc: string };
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user_token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("Accept", `application/json`);
      return headers;
    },
  }),
  tagTypes: ["CartItems", "BookMarks", "Tickets"],
  endpoints: (build) => ({
    getTeachers: build.query<Teacher[], void>({
      query: () => `/users/teachers`,
    }),
    getCategores: build.query<Category[], void>({
      query: () => `/categories/get`,
    }),

    search: build.query<SearchData, { search: string }>({
      query: ({ search }) => ({
        url: `/home?search=${search}`,
        method: "post",
      }),
    }),

    about: build.query<About, void>({
      query: () => ({ url: `/home/about` }),
    }),

    mostLikeCourse: build.query<CourseListItem[], void>({
      query: () => ({
        url: `/home/MostLike`,
        method: "post",
        params: { type: "course" },
      }),
    }),

    latestArticle: build.query<BlogListItem[], void>({
      query: () => ({ url: `/articles/latest` }),
    }),

    getMostLikes: build.query<
      CartData[],
      { type?: "course" | "article" | "product" | "podcast" | "media" }
    >({
      query: ({ type = "course" }) => {
        return type === "product"
          ? {
              url: "/products/MostSell",
            }
          : {
              url: `/home/MostLike?type=${type}`,
              method: "POST",
            };
      },
    }),

    getArticleData: build.query<{ article: BlogItem }, { articleId: number }>({
      query: ({ articleId }) => `/articles/get/${articleId}`,
    }),
    getCourseData: build.query<{ course: CourseItem }, { courseId: number }>({
      query: ({ courseId }) => `/courses/get/${courseId}`,
    }),
    getLessonData: build.query<
      { lessons: LessenItem },
      { lessonId: number; withDate?: boolean }
    >({
      query: ({ lessonId, withDate }) => ({
        url: withDate
          ? `/lessons/current/get/${lessonId}`
          : `/lessons/get/${lessonId}`,
      }),
    }),
    getProductData: build.query<
      { product: ProductListItem },
      { productId: number }
    >({
      query: ({ productId }) => `/products/get/${productId}`,
    }),

    getMediaCourses: build.query<
      PaginateData<CourseListItem>,
      { courseType: string }
    >({
      query: ({ courseType }) => ({
        url: `/courses/get/${courseType}/data`,
      }),
    }),
    getTvCourses: build.query<PaginateData<CourseListItem>, void>({
      query: () => ({
        url: `/courses/get/tv/data`,
      }),
    }),
    getCategoryModels: build.query<
      PaginateData<any>,
      { categoryId: number; model: string }
    >({
      query: ({ categoryId, model }) =>
        `/categories/get/${model}/${categoryId}`,
    }),
    getAppDownloadLink: build.query<{ link: string }, void>({
      query: () => "/home/app",
    }),
    getNews: build.query<NewsItem[], void>({
      query: () => "/home/notification/get",
    }),
  }),
});

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    let errMessage = null;
    // console.log({ action });
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      //  console.warn('We got a rejected action!', { action })
      if ((action.meta.arg as any).endpointName !== "auth") {
        if (typeof (action.payload as any)?.data === "string")
          errMessage = (action.payload as any)?.data;
        else
          errMessage =
            (action.payload as any)?.data?.message ??
            "درخواست با خطا مواجه شد.";
      }
    }

    if (errMessage) toast.error(errMessage);

    return next(action);
  };

export const {
  useGetTeachersQuery,
  useGetCategoresQuery,
  useSearchQuery,
  useAboutQuery,
  useMostLikeCourseQuery,
  useLatestArticleQuery,
  useGetMostLikesQuery,
  useGetCourseDataQuery,
  useGetLessonDataQuery,
  useLazyGetProductDataQuery,
  useGetArticleDataQuery,
  useGetMediaCoursesQuery,
  useGetTvCoursesQuery,
  useGetCategoryModelsQuery,
  useGetAppDownloadLinkQuery,
  useGetNewsQuery,
} = baseApi;
