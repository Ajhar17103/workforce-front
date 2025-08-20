import { configureStore } from '@reduxjs/toolkit';
import deparmentReducer from './slices/departmentSlice';
import designationReducer from './slices/designationSlice';
import menuReducer from './slices/menuSlice';
import roleMenuPermissionReducer from './slices/roleMenuPermissionSlice';
import roleReducer from './slices/roleSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    role: roleReducer,
    roleMenuPermission: roleMenuPermissionReducer,
    department: deparmentReducer,
    designation: designationReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
