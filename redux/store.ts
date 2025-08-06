import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./slices/countrySlice";
import misssionReducer from "./slices/missionSlice"
import allowanceReducer from "./slices/allowanceSlice"

export const store = configureStore({
  reducer: {
    country: countryReducer,
    mission:misssionReducer,
    allowance:allowanceReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
