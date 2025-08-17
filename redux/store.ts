import { configureStore } from '@reduxjs/toolkit';
import deparmentReducer from './slices/departmentSlice';
import designationReducer from './slices/designationSlice';
import menuReducer from './slices/menuSlice';
import roleReducer from './slices/roleSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    role: roleReducer,
    department: deparmentReducer,
    designation: designationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
