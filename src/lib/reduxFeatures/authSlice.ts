import { PayloadAction } from "@reduxjs/toolkit";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { createAppSlice } from "@/lib/createAppSlice";
import { authApi } from "@/lib/services/auth";
import { Season, User } from "@/types/";

type Action = "login" | "signup" | "reset-password";
export interface AuthSliceState {
  user_token: string | null | undefined;
  user: User | null;
  season: Season;
  loading: boolean;
  phone?: string | null;
  redirect?: string | null;
  action?: Action;
  shouldLogin?: boolean;
}

const initialState: AuthSliceState =
  typeof document === "undefined" || typeof window === "undefined"
    ? {
        user_token: null,
        user: null,
        loading: false,
        season: "unknown",
      }
    : {
        user_token: getCookie("user_token"),
        user: null,
        loading: false,
        season: "unknown",
      };
export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: (create) => ({
    setRedirect: create.reducer(
      (
        state,
        action: PayloadAction<{
          phone?: string;
          redirect?: string;
          action?: Action;
        }>
      ) => {
        if (action.payload.phone) state.phone = action.payload.phone;
        if (action.payload.redirect) state.redirect = action.payload.redirect;
        if (action.payload.action) state.action = action.payload.action;
      }
    ),

    login: create.reducer(
      (state, action: PayloadAction<{ user: User; user_token: string }>) => {
        state.user_token = action.payload.user_token;
        state.user = action.payload.user;
        setCookie("user_token", action.payload.user_token);
      }
    ),
  }),

  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.auth.matchPending, (state) => {
      state.loading = true;
    }),
      builder.addMatcher(
        authApi.endpoints.auth.matchFulfilled,
        (state, { payload }) => {
          state.loading = false;
          if (payload.user) {
            state.user = payload.user;
            state.shouldLogin = false;
            state.season = payload.season;
          }
        }
      ),
      builder.addMatcher(
        authApi.endpoints.auth.matchRejected,
        (state, { payload }) => {
          state.loading = false;
          state.user = null;
          state.user_token = null;
          state.shouldLogin = true;
          state.season = null;
          // deleteCookie("user_token")
        }
      ),
      builder.addMatcher(
        authApi.endpoints.loginToken.matchFulfilled,
        (state, { payload }) => {
          state.user = payload.user;
          state.user_token = payload.Token;
          state.season = payload.season;
          setCookie("user_token", payload.Token);
        }
      );
    builder.addMatcher(
      authApi.endpoints.loginPassword.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.user_token = payload.Token;
        state.season = payload.season;
        setCookie("user_token", payload.Token);
      }
    );
    builder.addMatcher(
      authApi.endpoints.registerUser.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.user_token = payload.Token;
        state.season = payload.season;
        setCookie("user_token", payload.Token);
      }
    );
    builder.addMatcher(
      authApi.endpoints.logout.matchFulfilled,
      (state, { payload }) => {
        state.user = null;
        state.user_token = null;
        state.season = null;
        state.shouldLogin = true;
        deleteCookie("user_token");
      }
    );
  },

  selectors: {
    selectUser: (auth) => auth.user,
    selectToken: (auth) => auth.user_token,
    selectLoading: (auth) => auth.loading,
    selectPhone: (auth) => auth.phone,
    selectRedirect: (auth) => auth.redirect,
    selectAction: (auth) => auth.action,
    selectShouldLogin: (auth) => auth.shouldLogin,
    selectUserSeason: (auth) => auth.season,
  },
});

export const { setRedirect, login } = authSlice.actions;

export const {
  selectLoading,
  selectUser,
  selectPhone,
  selectRedirect,
  selectToken,
  selectAction,
  selectShouldLogin,
  selectUserSeason,
} = authSlice.selectors;
