import { AdminCommentItem, CommentItem, CommentStatus, Ticket } from '@/types/';
import { PaginateData } from '@/types/response';
import { baseApi } from './base';

export const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getModelComments: build.mutation<
      PaginateData<CommentItem>,
      { id: number; model: string; page?: number }
    >({
      query: ({ id, model, page = 1 }) => {
        return {
          url: `/comment/get/type/${id}?page=${page}`,
          method: 'post',
          body: {
            type: `App\\Models\\${model.toLocaleUpperCase()}`
          }
        };
      }
    }),
    getAdminComments: build.mutation<
      PaginateData<AdminCommentItem>,
      { page?: number; type?: 'all' | 'accepted' | 'rejected' }
    >({
      query: ({ page = 1, type = 'all' }) => {
        return {
          url: `/comment/get${type === 'all' ? '' : '/' + type}?page=${page}`
        };
      }
    }),

    toggleCommentStatus: build.mutation<
      { status: CommentStatus },
      { id: number; status: 'accept' | 'reject' }
    >({
      query: ({ id, status }) => {
        return {
          url: `/comment/${status}/${id}`,
          method: 'post'
        };
      }
    }),

    removeComment: build.mutation<void, { id: number }>({
      query: ({ id }) => {
        return {
          url: `/comment/remove/${id}`,
          method: 'post'
        };
      }
    }),
    replyComment: build.mutation<
      CommentItem,
      {
        commentId: number;
        body: string;
        modelType: string;
        modelId: number;
      }
    >({
      query: ({ commentId, body, modelId, modelType }) => {
        return {
          url: '/comment/add/reply',
          body: {
            body,
            comment_id: commentId,
            [`${modelType}_id`]: modelId
          },
          method: 'post'
        };
      }
    }),

    getAdminTickets: build.query<Ticket[], void>({
      query: () => {
        return {
          url: `/ticket/get`
        };
      }
    }),
    updateTickets: build.mutation<
      any,
      { ticket_id: number; department_id: number; send_sms: 0 | 1 }
    >({
      query: ({ department_id, send_sms, ticket_id }) => {
        return {
          url: `/ticket/update/${ticket_id}`,
          method: 'post',
          body: {
            department_id,
            send_sms
          }
        };
      }
    })
  }),

  overrideExisting: false
});

export const {
  useGetModelCommentsMutation,
  useGetAdminCommentsMutation,
  useToggleCommentStatusMutation,
  useRemoveCommentMutation,
  useReplyCommentMutation,
  useGetAdminTicketsQuery,
  useUpdateTicketsMutation
} = adminApi;
