import { configureStore } from '@reduxjs/toolkit';
import attendanceReducer from './slices/attendanceSlice';
import deparmentReducer from './slices/departmentSlice';
import designationReducer from './slices/designationSlice';
import menuReducer from './slices/menuSlice';
import projectReducer from './slices/projectSlice';
import roleMenuPermissionReducer from './slices/roleMenuPermissionSlice';
import roleReducer from './slices/roleSlice';
import sprintReducer from './slices/sprintSlice';
import taskReducer from './slices/taskSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    role: roleReducer,
    roleMenuPermission: roleMenuPermissionReducer,
    department: deparmentReducer,
    designation: designationReducer,
    user: userReducer,
    project: projectReducer,
    sprint: sprintReducer,
    task: taskReducer,
    attendance: attendanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
