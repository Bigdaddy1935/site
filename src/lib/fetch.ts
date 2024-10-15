import {
  BlogItem,
  BlogListItem,
  Category,
  CommentItem,
  CourseItem,
  CourseListItem,
  GalleryItem,
  LessenItem,
  NewsItem,
  PodcastListItem,
  ProductListItem,
  ShowCase,
  SiteStatistics,
} from "@/types";
import { PaginateData } from "@/types/response";

const initRevalidate = process.env.NEXT_PUBLIC_REVALIDATE
  ? Number(process.env.NEXT_PUBLIC_REVALIDATE)
  : 7200;

const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export async function cFetch<T>(
  route: string,
  init: {
    body?: object;
    revalidate?: number;
    headers?: HeadersInit;
    method?: string;
  } = {
    revalidate: initRevalidate,
    headers: {},
    method: "GET",
  }
) {
  const { body, headers, method, revalidate } = init;
  try {
    let data = await fetch(`${ServerUrl}${route}`, {
      next: { revalidate: revalidate },
      method: body ? "POST" : method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
      },
    });

    let jsonData = await data.json();

    return jsonData;
  } catch (error) {
    throw new Error("خطا در برقراری ارتباط با سرور");
  }
}

export const getCategoreis = async (): Promise<Category[]> => {
  return await cFetch<Category[]>("/categories/get");
};

export const getCategory = async (categoryId: number): Promise<Category> => {
  return await cFetch<Category>(`/categories/get/${categoryId}`);
};

export const getCategoryModel = async <T>(
  categoryId: number,
  model: string
): Promise<PaginateData<T>> => {
  return await cFetch<T>(`/categories/get/${model}/${categoryId}`);
};

export const getLeatestCourse = async () => {
  return await cFetch<PaginateData<CourseListItem>>(`/courses/latest`);
};
export const getLeatestArticle = async () => {
  return await cFetch<PaginateData<BlogListItem>>(`/articles/latest`);
};
export const getLeatestProducts = async () => {
  return await cFetch<PaginateData<ProductListItem>>(`/products/news`);
};

export const getLeatestPodcasts = async () => {
  return await cFetch<PaginateData<PodcastListItem>>(`/lessons/podcast/latest`);
};
export const getShowcases = async () => {
  return await cFetch<ShowCase[]>(`/showcase/get`);
};

export const getStatistics = async () => {
  return await cFetch<SiteStatistics[]>(`/home/details`);
};
export const getLatestComments = async () => {
  return await cFetch<PaginateData<CommentItem>>(
    `/comment/get/accepted/type/630`,
    { method: "POST", body: { type: "App\\Models\\Lesson" } }
  );
};

export const getAcademyGallery = async () => {
  return await cFetch<GalleryItem[]>(`/gallery/get`);
};

export const getArticle = async (articleId: string) => {
  return await cFetch<{ article: BlogItem }>(`/articles/get/${articleId}`);
};

export const getArticleComments = async (articleId: string) => {
  return await cFetch<PaginateData<CommentItem>>(
    `/comment/get/accepted/type/${articleId}`,
    { method: "POST", body: { type: "App\\Models\\Article" } }
  );
};

export const getArticles = async (
  categoryId: string | null | undefined,
  title: string
) => {
  let querySearch = "?";

  querySearch += categoryId ? `categories=${categoryId}&` : "";
  querySearch += title ? `title=${title}` : "";

  return await cFetch<PaginateData<BlogListItem>>(`/articles${querySearch}`);
};

export const getArticlesByTag = async (
  tagName: string
): Promise<PaginateData<BlogListItem>> => {
  return await cFetch<PaginateData<BlogListItem>>(`/articles/from/tags`, {
    body: { tags: decodeURI(tagName) },
  });
};

export const getCourse = async (
  courseId: string
): Promise<{ course: CourseItem }> => {
  return await cFetch<PaginateData<BlogListItem>>(`/courses/get/${courseId}`);
};

export const getCourseComments = async (
  courseId: string
): Promise<PaginateData<CommentItem>> => {
  return await cFetch<PaginateData<CommentItem>>(
    `/comment/get/accepted/type/${courseId}`,
    { method: "POST", body: { type: "App\\Models\\Course" } }
  );
};

export const getCourses = async (
  categoryId: string | null | undefined,
  course_teacher: string,
  course_title: string
) => {
  let querySearch = "?";
  querySearch += categoryId ? `categories=${categoryId}&` : "";
  querySearch += course_teacher ? `course_teacher=${course_teacher}&` : "";
  querySearch += course_title ? `course_title=${course_title}&` : "";

  return await cFetch<PaginateData<CourseListItem>>(`/courses${querySearch}`);
};

export const getAllMediaLessons = async (): Promise<
  PaginateData<LessenItem>
> => {
  return await cFetch<PaginateData<LessenItem>>(`/lessons/get/all_media/data`);
};

export const getMediaCourses = async (
  courseType: string
): Promise<PaginateData<CourseListItem>> => {
  return await cFetch<PaginateData<CourseListItem>>(
    `/courses/get/${courseType}/data`
  );
};

export const getMediaLessons = async (
  currentCourseId: string
): Promise<PaginateData<LessenItem>> => {
  return await cFetch<PaginateData<LessenItem>>(
    `/lessons/get/courseId/${currentCourseId}`
  );
};

export const getPodcasts = async (categoryId: string | null, search: string | null) => {
  let querySearch = "?";
  querySearch += categoryId ? `categories=${categoryId}&` : "";
  querySearch += search ? `title=${search}` : "";

  return await cFetch<PaginateData<LessenItem>>(
    `/lessons/podcast/search${querySearch}`
  );
};

export const getProducts = async (
  categoryId: string | null | undefined,
  product_teacher: string,
  product_title: string
) => {
  let querySearch = "?";

  querySearch += categoryId ? `categories=${categoryId}&` : "";
  querySearch += product_teacher ? `product_teacher=${product_teacher}&` : "";
  querySearch += product_title ? `product_title=${product_title}` : "";

  return await cFetch<PaginateData<ProductListItem>>(`/products${querySearch}`);
};

export const getTvCourses = async (): Promise<PaginateData<CourseListItem>> => {
  return await cFetch(`/courses/get/tv/data`);
};

export const getTvLessons = async (
  courseId: string
): Promise<PaginateData<LessenItem>> => {
  return await cFetch(`/lessons/get/courseId/${courseId}`);
};

export const getNews = async (): Promise<NewsItem[]> => {
  return await cFetch(`/home/notification/get`);
};
