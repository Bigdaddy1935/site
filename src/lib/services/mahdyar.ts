import {
  City,
  CourseListItem,
  MahdyarExists,
  PlanType,
  Quiz,
  State,
} from "@/types/";
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

    getStates: build.query<State[], void>({
      query: () => "/mahdyar/get/state",
    }),
    getStateCities: build.query<City[], { stateName: string }>({
      query: ({ stateName }) => `/mahdyar/get/city/${stateName}`,
    }),

    checkMahdyarExists: build.query<MahdyarExists, void>({
      query: () => `/mahdyar/exists`,
    }),

    registerClub: build.mutation({
      query: (body) => ({
        url: "/mahdyar/add",
        body,
        method: "post",
      }),
    }),
    payMahdyarWithZarinpal: build.mutation<
      { link: string },
      { type : PlanType; callback: string }
    >({
      query: ({ type, callback }) => ({
        url: `/mahdyar/invoice`,
        method: "post",
        body: {
          type,
          callback,
        },
      }),
    }),
    verifyZarinpal: build.query<
      {
        zarinpal_info: {
          id: number;
          amount: number;
          authority: string;
          discount_code: null;
          created_at: string;
          updated_at: string;
        };
        message: string;
        referenceId: string;
      },
      { Authority: string }
    >({
      query: ({ Authority }) => ({
        url: `/mahdyar/invoice/verify`,
        method: "post",
        params: {
          Authority,
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
  usePayMahdyarWithZarinpalMutation,
  useGetStateCitiesQuery,
  useGetStatesQuery,
  useVerifyZarinpalQuery,
  useRegisterClubMutation,
  useCheckMahdyarExistsQuery,
} = mahdiyarApi;
