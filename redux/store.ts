import { configureStore } from '@reduxjs/toolkit';
import leaveReducer from './slices/allocatedLeaveSlice';
import attendanceReducer from './slices/attendanceSlice';
import DailyStandupReducer from './slices/dailyStandupSlice';
import deparmentReducer from './slices/departmentSlice';
import designationReducer from './slices/designationSlice';
import leaveRequestReducer from './slices/leaveRequestSlice';
import menuReducer from './slices/menuSlice';
import projectReducer from './slices/projectSlice';
import reportReducer from './slices/reportSlice';
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
    leave: leaveReducer,
    leaveRequest: leaveRequestReducer,
    dailyStandup: DailyStandupReducer,
    reports: reportReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
