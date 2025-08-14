import { configureStore } from '@reduxjs/toolkit';
import menuReducer from './slices/menuSlice';
import roleReducer from './slices/roleSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    role:roleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
