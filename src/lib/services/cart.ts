import { CartItem } from "@/types/";
import { baseApi } from "./base";

export const cartApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCart: build.query<{
            cart: CartItem[],
            total: number
        }, void>({
            query: () => '/cart/get',
            //  providesTags: ["CartItems"]
        }),

        addToCart: build.mutation<void, { product_id: number }>({
            query: ({ product_id }) => ({
                url: `/cart/add/${product_id}`,
                method: "post"
            }),
            //  invalidatesTags: ["CartItems"]
        }),
        deleteFromCart: build.mutation<void, { cart_id: number }>({
            query: ({ cart_id }) => ({
                url: `/cart/delete/${cart_id}`,
                method: "delete"
            }),
            //    invalidatesTags: ["CartItems"]
        }),
        discount: build.mutation<{
            discount_percentage: string
            newTotal: number
        }, { discount_code: string }>({
            query: ({ discount_code }) => ({
                url: `/discount/use`,
                method: "post",
                body: { discount_code }
            }),
        }),
        payWithWallet: build.mutation<any, { code: string | null }>({
            query: ({ code }) => ({
                url: `/users/withdraw`,
                method: "post",
                body: { code }
            }),
        }),
        payWithZarinpal: build.mutation<{ link: string }, { code: string | null, callback: string }>({
            query: ({ code, callback }) => ({
                url: `/zarinpal`,
                method: "post",
                body: {
                    code,
                    callback
                }
            }),
        }),
        verifyZarinpal: build.query<{ref_id : string}, { Authority: string }>({
            query: ({ Authority }) => ({
                url: `/zarinpal/verify`,
                method: "post",
                params: {
                    Authority
                }
            }),
        }),


    }),

    overrideExisting: false
});

export const {
    useAddToCartMutation,
    useGetCartQuery,
    useLazyGetCartQuery,
    useDeleteFromCartMutation,
    useDiscountMutation,
    usePayWithWalletMutation,
    usePayWithZarinpalMutation,
    useVerifyZarinpalQuery
} = cartApi