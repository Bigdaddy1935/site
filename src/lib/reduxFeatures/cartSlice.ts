import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/lib/createAppSlice";
import { cartApi } from "@/lib/services/cart";
import { CartItem } from "@/types/";

export interface CartSliceState {
    cartItems: CartItem[];
    total: number;
    discount: number;
    finalPrice: number;
    discount_code: string | null;
}

const initialState: CartSliceState = {
    cartItems: [],
    total: 0,
    discount: 0,
    finalPrice: 0,
    discount_code: null,
}
export const cartSlice = createAppSlice({
    name: "cart",
    initialState,
    reducers: (creators) => ({
        setDiscountCode: (state, payLoad: PayloadAction<string>) => {
            state.discount_code = payLoad.payload;
        }
    }),
    extraReducers: (builder) => {
        builder.addMatcher(cartApi.endpoints.getCart.matchFulfilled, (state, { payload }) => {
            state.cartItems = payload.cart;
            state.total = payload.total;
            state.finalPrice = payload.total;
        }),
            builder.addMatcher(cartApi.endpoints.discount.matchFulfilled, (state, { payload }) => {
                state.discount = state.total - payload.newTotal;
                state.finalPrice = payload.newTotal;
            })
    },

    selectors: {
        selectCart: (cart) => cart.cartItems,
        selectCartTotal: (cart) => cart.total,
        selectDiscount: (cart) => cart.discount,
        selectFinalPrice: (cart) => cart.finalPrice,
        selectDiscountCode: (cart) => cart.discount_code
    }
})


export const { selectCart, selectCartTotal, selectDiscount, selectFinalPrice , selectDiscountCode } = cartSlice.selectors;

export const { setDiscountCode } = cartSlice.actions