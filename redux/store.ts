import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "./slices/countrySlice";
import misssionReducer from "./slices/missionSlice"

export const store = configureStore({
  reducer: {
    country: countryReducer,
    mission:misssionReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
