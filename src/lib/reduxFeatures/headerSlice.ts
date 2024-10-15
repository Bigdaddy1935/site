import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/lib/createAppSlice";
import { PlanType } from "@/types";

export interface HeaderSlice {
  label?: string | null;
  backUrl?: string | null;
  needAnimation?: boolean;
  courseShowQuiz?: boolean;
  plan?: PlanType | null;
}
const initialState: HeaderSlice = {
  label: null,
  backUrl: null,
  needAnimation: false,
  courseShowQuiz: false,
  plan: null,
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
    setPlan: (state, payload: PayloadAction<PlanType>) => {
      state.plan = payload.payload;
    },
  }),

  selectors: {
    selectHeader: (header) => header,
    selectPlan: (header) => header.plan,
  },
});

export const { selectHeader , selectPlan } = headerSlice.selectors;
export const { setHeader, setQuiz , setPlan } = headerSlice.actions;
