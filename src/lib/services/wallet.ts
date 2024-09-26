import { Deposit } from "@/types/";
import { baseApi } from "./base";

export const walletApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        depositHistory: build.query<Deposit[], void>({
            query: () => '/users/deposit/history'
        }),


        increaseWallet: build.mutation<{ link: string }, { amount: number, callback: string }>({
            query: ({ amount, callback }) => ({
                url: "/zarinpal/wallet",
                method: "post",
                body: {
                    amount,
                    callback
                }
            })
        }),

        verifyDeposit: build.query<{ reference_id: string, wallet_balance: number }, { Authority: string }>({
            query: ({ Authority }) => ({
                url: `/users/deposit`,
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
    useIncreaseWalletMutation,
    useVerifyDepositQuery,
    useDepositHistoryQuery
} = walletApi;