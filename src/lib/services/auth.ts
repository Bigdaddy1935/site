import {
  BlogListItem,
  CommentItem,
  CourseItem,
  CourseListItem,
  LessenItem,
  LessonItemBookmark,
  Model,
  Order,
  ProductListItem,
  Season,
  User,
} from "@/types/";
import { baseApi } from "./base";

export type UserSignupData = {
  username: string;
  gender: 1 | 0;
  picture: any;
  firstname: string;
  lastname: string;
  phone: string;
  password: string;
  IdentificationCode: string;
};

export type UpdateProfileData = {
  address: string | null;
  birthday: string | null;
  national_code: string | null;
  username: string;
  gender: 1 | 0;
  picture: any;
  firstname: string;
  lastname: string;
  phone: string;
};

type UserCourse = {
  lessons: LessenItem[];
} & CourseItem;

type BookmarkLessenItem = {
  course: CourseListItem;
} & LessenItem;
type UserBookmarkList = {
  products: ProductListItem[];
  courses: CourseListItem[];
  articles: BlogListItem[];
  lessons: LessonItemBookmark[];
  media: any[];
  tv: any[];
  podcast: any[];
};
export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    auth: build.query<{ user: User; season: Season }, {}>({
      query: () => "/users/auth",
    }),

    phoneCheck: build.mutation<{ UserExisted: boolean }, { phone: string }>({
      query: ({ phone }) => ({
        url: "/users/phone/check",
        body: { phone },
        method: "post",
      }),
    }),
    loginPassword: build.mutation<
      { user: User; Token: string; season: Season },
      { phone: string; password: string }
    >({
      query: ({ phone, password }) => ({
        url: "/users/login/password",
        body: { phone, password },
        method: "post",
      }),
    }),
    sendToken: build.mutation<{ UserExisted: boolean }, { phone: string }>({
      query: ({ phone }) => ({
        url: "/users/send/token",
        body: { phone },
        method: "post",
      }),
    }),
    checkToken: build.mutation<
      { UserExisted: boolean },
      { phone: string; token: string }
    >({
      query: ({ phone, token }) => ({
        url: "/users/check/token",
        body: { phone, token },
        method: "post",
      }),
    }),
    loginToken: build.mutation<
      { user: User; Token: string; season: Season },
      { phone: string; token: string }
    >({
      query: ({ phone, token }) => ({
        url: "/users/login/token",
        body: { phone, token },
        method: "post",
      }),
    }),

    registerUser: build.mutation<
      { user: User; Token: string; season: Season },
      UserSignupData
    >({
      query: (body) => {
        var bodyFormData = new FormData();
        for (const key in body) {
          bodyFormData.append(key, (body as any)[key] ?? "");
        }
        return {
          url: `/users/register/newUser`,
          method: "post",
          formData: true,
          body: bodyFormData,
        };
      },
    }),

    logout: build.mutation<void, void>({
      query: () => ({
        url: "/users/logout",
        method: "post",
      }),
    }),

    like: build.mutation<void, { model: Model; id: number }>({
      query: ({ model, id }) => `/${model}s/like/${id}`,
    }),

    bookmark: build.mutation<void, { model: Model; id: number }>({
      query: ({ model, id }) => `/${model}s/bookmark/${id}`,
      invalidatesTags: ["BookMarks"],
    }),
    addComment: build.mutation<
      CommentItem,
      { model: Model; id: number; body: string }
    >({
      query: ({ model, id, body }) => ({
        url: "/comment/add",
        method: "post",
        body: {
          body,
          [`${model}_id`]: id,
        },
      }),
    }),

    progress: build.mutation<
      void,
      { lessonId: number; currentTime: number; duration: number }
    >({
      query: ({ lessonId, duration, currentTime }) => ({
        url: `progress/save/time/${lessonId}`,
        method: "post",
        body: {
          duration,
          time: currentTime,
        },
      }),
    }),

    updateProfile: build.mutation<void, UpdateProfileData>({
      query: (body) => {
        var bodyFormData = new FormData();
        for (const key in body) {
          bodyFormData.append(key, (body as any)[key] ?? "");
        }
        bodyFormData.append("role", "0");
        return {
          url: `/users/update`,
          method: "post",
          formData: true,
          body: bodyFormData,
        };
      },
    }),

    getBookMarks: build.query<UserBookmarkList, void>({
      query: () => "/users/bookmarks",
      providesTags: ["BookMarks"],
    }),

    getUserCourses: build.query<UserCourse[], { type: string }>({
      query: ({ type }) => `/users/courses/${type}`,
    }),

    getUserOrders: build.query<Order[], void>({
      query: () => `/invoices/get`,
    }),

    forgotPassword: build.mutation<void, { phone: string }>({
      query: ({ phone }) => ({
        url: "/users/forget/password",
        method: "post",
        body: { phone },
      }),
    }),

    resetPassword: build.mutation<void, { phone: string; password: string }>({
      query: ({ phone, password }) => ({
        url: "/users/new/password",
        method: "post",
        body: { phone, password },
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useAuthQuery,
  usePhoneCheckMutation,
  useLoginPasswordMutation,
  useSendTokenMutation,
  useCheckTokenMutation,
  useLoginTokenMutation,
  useRegisterUserMutation,
  useLazyAuthQuery,
  useLikeMutation,
  useBookmarkMutation,
  useAddCommentMutation,
  useProgressMutation,
  useUpdateProfileMutation,
  useGetBookMarksQuery,
  useGetUserCoursesQuery,
  useGetUserOrdersQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authApi;
