import { Action, ThunkAction, combineSlices, configureStore } from '@reduxjs/toolkit';
import { authSlice } from './reduxFeatures/authSlice';
import { cartSlice } from './reduxFeatures/cartSlice';
import { headerSlice } from './reduxFeatures/headerSlice';
import { baseApi, rtkQueryErrorLogger } from './services/base';

const rootReducer = combineSlices(authSlice, cartSlice, headerSlice, baseApi);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddlware) => {
      return getDefaultMiddlware().concat(baseApi.middleware, rtkQueryErrorLogger);
    }
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
