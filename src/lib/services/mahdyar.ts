import { CourseListItem, Quiz } from "@/types/";
import { PaginateData } from "@/types/response";
import { baseApi } from "./base";

export const mahdiyarApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getClubs: build.query<
      PaginateData<CourseListItem>,
      { categoryId: number; page: number }
    >({
      query: ({ categoryId }) => `/categories/get/clubs/${categoryId}`,
      //  providesTags: ["CartItems"]
    }),
    getCourseQuiz: build.query<Quiz[], { course_id: number }>({
      query: ({ course_id }) => ({
        url: "/quiz/course",
        method: "post",
        body: {
          course_id,
        },
      }),
    }),

    userQuizScore: build.mutation<Quiz[], { quiz_id: number; score: number }>({
      query: ({ quiz_id, score }) => ({
        url: "/quiz/user/score",
        method: "post",
        body: {
          quiz_id,
          score,
        },
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useLazyGetClubsQuery,
  useGetCourseQuizQuery,
  useUserQuizScoreMutation,
} = mahdiyarApi;
