import { DepartmanQuestion, Ticket, TicketDepartmanList } from "@/types/";
import { baseApi } from "./base";

export const ticketApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDepartmans: build.query<TicketDepartmanList[], void>({
            query: () => '/department/get',
        }),
        getDepartmanById: build.query<{ department : { questions: DepartmanQuestion[] } }, { id: number }>({
            query: ({ id }) => `/department/get/${id}`,
        }),

        getUserTicket: build.query<Ticket[], void>({
            query: () => `/ticket/user/get`,
            providesTags: ["Tickets"]
        }),

        replyTicket: build.mutation<{}, { text: string, ticket_id: number, file: any }>({
            query: (body) => {
                const bodyFormData = new FormData();
                for (const key in body) {
                    bodyFormData.append(key, (body as any)[key] ?? '');
                }
                return {
                    url: `/ticket/reply`,
                    method: "post",
                    body: bodyFormData
                }
            },

            invalidatesTags: ["Tickets"]
        }),
        addTicket: build.mutation<{}, { text: string, title: string, file: any }>({
            query: (body) => {
                const bodyFormData = new FormData();
                for (const key in body) {
                    bodyFormData.append(key, (body as any)[key] ?? '');
                }
                return {
                    url: `/ticket/add`,
                    method: "post",
                    body: bodyFormData
                }
            },

            invalidatesTags: ["Tickets"]
        }),
    }),

    overrideExisting: false
});

export const {
    useGetDepartmansQuery,
    useGetDepartmanByIdQuery,
    useGetUserTicketQuery,
    useReplyTicketMutation,
    useAddTicketMutation,
} = ticketApi