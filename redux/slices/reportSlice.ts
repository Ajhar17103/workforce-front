import axiosInstance from '@/lib/axiosInstance';
import { getReportApiUrl } from '@/utils/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type ApiPayload<T> = T[];

interface ReportState {
  projectReport: any[];
  dailyUserTaskReport: any[];
  userTaskReport: any[];
  dailyStandupReport: any[];
  dateWiseStandupReport: any[];
  dailyAttendanceReport: any[];
  sprintReport: any[];
  projectOverviewReport: any[];
  projectRoadmapReport: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  projectReport: [],
  dailyUserTaskReport: [],
  userTaskReport: [],
  dailyStandupReport: [],
  dateWiseStandupReport: [],
  dailyAttendanceReport: [],
  sprintReport: [],
  projectOverviewReport: [],
  projectRoadmapReport:[],
  loading: false,
  error: null,
};

const fetchReport = async (url: string, rejectWithValue: any) => {
  try {
    const res = await axiosInstance.get(getReportApiUrl(url));
    return res.data.payload;
  } catch (err: any) {
    return rejectWithValue(
      err?.response?.data?.message ||
        err?.message ||
        `Failed to fetch report from ${url}`,
    );
  }
};

// Thunks
export const fetchProjectReport = createAsyncThunk<ApiPayload<any>, void>(
  'report/fetchProjectReport',
  async (_, { rejectWithValue }) =>
    fetchReport('/project-reports', rejectWithValue),
);

export const fetchDailyUserTaskReport = createAsyncThunk<ApiPayload<any>, void>(
  'report/fetchTodayUserTaskReport',
  async (_, { rejectWithValue }) =>
    fetchReport('/daily-user-task-reports', rejectWithValue),
);

export const fetchUserTaskReport = createAsyncThunk<ApiPayload<any>, void>(
  'report/fetchUserTaskReport',
  async (_, { rejectWithValue }) =>
    fetchReport('/user-task-reports', rejectWithValue),
);

export const fetchDailyStandupReport = createAsyncThunk<ApiPayload<any>, void>(
  'report/fetchDailyStandupReport',
  async (_, { rejectWithValue }) =>
    fetchReport('/standup-reports', rejectWithValue),
);

export const fetchDailyStandupsByDateReport = createAsyncThunk<
  ApiPayload<any>,
  string
>(
  'report/fetchDailyStandupsByDateReport',
  async (toDate, { rejectWithValue }) =>
    fetchReport(`/standup-reports-by-date/${toDate}`, rejectWithValue),
);

export const fetchDailyAttendanceReport = createAsyncThunk<
  ApiPayload<any>,
  void
>('report/fetchDailyAttendanceReport', async (_, { rejectWithValue }) =>
  fetchReport('/daily-attendance-reports', rejectWithValue),
);

export const fetchSprintReport = createAsyncThunk<ApiPayload<any>, void>(
  'report/fetchSprintReport',
  async (_, { rejectWithValue }) =>
    fetchReport('/sprints-reports', rejectWithValue),
);

export const fetchProjectOverviewReport = createAsyncThunk<
  ApiPayload<any>,
  void
>('report/fetchProjectOverviewReport', async (projectId, { rejectWithValue }) =>
  fetchReport(
    `/project-overview-reports?projectId=${projectId}`,
    rejectWithValue,
  ),
);

export const fetchProjectRoadmapReport = createAsyncThunk<
  ApiPayload<any>,
  void
>('report/fetchProjectRoadmapReport', async (projectId, { rejectWithValue }) =>
  fetchReport(
    `/project-roadmap-reports?projectId=${projectId}`,
    rejectWithValue,
  ),
);

// Slice
const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    clearReportState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    const setPending = (state: ReportState) => {
      state.loading = true;
      state.error = null;
    };
    const setRejected = (
      state: ReportState,
      action: PayloadAction<unknown>,
    ) => {
      state.loading = false;
      state.error = action.payload as string;
    };

    builder
      // Project
      .addCase(fetchProjectReport.pending, setPending)
      .addCase(fetchProjectReport.fulfilled, (state, action) => {
        state.loading = false;
        state.projectReport = action.payload;
      })
      .addCase(fetchProjectReport.rejected, setRejected)

      // daily User Task
      .addCase(fetchDailyUserTaskReport.pending, setPending)
      .addCase(fetchDailyUserTaskReport.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyUserTaskReport = action.payload;
      })
      .addCase(fetchDailyUserTaskReport.rejected, setRejected)

      // User Task
      .addCase(fetchUserTaskReport.pending, setPending)
      .addCase(fetchUserTaskReport.fulfilled, (state, action) => {
        state.loading = false;
        state.userTaskReport = action.payload;
      })
      .addCase(fetchUserTaskReport.rejected, setRejected)

      // Daily Standup
      .addCase(fetchDailyStandupReport.pending, setPending)
      .addCase(fetchDailyStandupReport.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyStandupReport = action.payload;
      })
      .addCase(fetchDailyStandupReport.rejected, setRejected)

      // Date-wise Standup
      .addCase(fetchDailyStandupsByDateReport.pending, setPending)
      .addCase(fetchDailyStandupsByDateReport.fulfilled, (state, action) => {
        state.loading = false;
        state.dateWiseStandupReport = action.payload;
      })
      .addCase(fetchDailyStandupsByDateReport.rejected, setRejected)

      // Daily Attendance
      .addCase(fetchDailyAttendanceReport.pending, setPending)
      .addCase(fetchDailyAttendanceReport.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyAttendanceReport = action.payload;
      })
      .addCase(fetchDailyAttendanceReport.rejected, setRejected)

      // sprint
      .addCase(fetchSprintReport.pending, setPending)
      .addCase(fetchSprintReport.fulfilled, (state, action) => {
        state.loading = false;
        state.sprintReport = action.payload;
      })
      .addCase(fetchSprintReport.rejected, setRejected)

      // project overview
      .addCase(fetchProjectOverviewReport.pending, setPending)
      .addCase(fetchProjectOverviewReport.fulfilled, (state, action) => {
        state.loading = false;
        state.projectOverviewReport = action.payload;
      })
      .addCase(fetchProjectOverviewReport.rejected, setRejected)

      // project roadmap
      .addCase(fetchProjectRoadmapReport.pending, setPending)
      .addCase(fetchProjectRoadmapReport.fulfilled, (state, action) => {
        state.loading = false;
        state.projectRoadmapReport = action.payload;
      })
      .addCase(fetchProjectRoadmapReport.rejected, setRejected);
  },
});

export const { clearReportState } = reportSlice.actions;
export default reportSlice.reducer;
