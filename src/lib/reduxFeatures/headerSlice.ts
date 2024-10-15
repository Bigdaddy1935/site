import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/lib/createAppSlice";

export interface HeaderSlice {
  label?: string | null;
  backUrl?: string | null;
  needAnimation?: boolean;
  courseShowQuiz?: boolean;
}
const initialState: HeaderSlice = {
  label: null,
  backUrl: null,
  needAnimation: false,
  courseShowQuiz: false,
};
export const headerSlice = createAppSlice({
  name: "header",
  initialState,
  reducers: () => ({
    setHeader: (state, payload: PayloadAction<HeaderSlice>) => {
      state.label = payload.payload.label;
      state.backUrl = payload.payload.backUrl ?? state.backUrl;
      state.needAnimation =
        payload.payload.needAnimation === undefined
          ? false
          : payload.payload.needAnimation;
    },
    setQuiz(state, payload: PayloadAction<boolean>) {
      state.courseShowQuiz = payload.payload;
    },
  }),

  selectors: {
    selectHeader: (header) => header,
  },
});

export const { selectHeader } = headerSlice.selectors;
export const { setHeader, setQuiz } = headerSlice.actions;
