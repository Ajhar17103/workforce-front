import axiosInstance from '@/lib/axiosInstance';
import { getReportApiUrl } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ReportState {
  projectReport: any[];
  userTaskReport: any[];
  dailyStandupReport: any[];
  dateWiseStandupReport: any[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  projectReport: [],
  userTaskReport: [],
  dailyStandupReport: [],
  dateWiseStandupReport: [],
  loading: false,
  error: null,
};

export const fetchProjectReport = createAsyncThunk(
  'report/fetchProjectReport',
  async (_, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getReportApiUrl('/project-reports'),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to fetch project report',
      );
    }
  },
);

export const fetchUserTaskReport = createAsyncThunk(
  'report/fetchUserTaskReport',
  async (_, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getReportApiUrl('/user-task-reports'),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to fetch user task report',
      );
    }
  },
);

export const fetchDailyStandupReport = createAsyncThunk(
  'report/fetchDailyStandupReport',
  async (_, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getReportApiUrl('/standup-reports'),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to fetch daily standup report',
      );
    }
  },
);

export const fetchDailyStandupsByDateReport = createAsyncThunk(
  'report/fetchDailyStandupsByDateReport',
  async (toDate: string, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getReportApiUrl(`/standup-reports-by-date/${toDate}`),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to fetch daily standup report by date',
      );
    }
  },
);

const reportSlice = createSlice({
  name: 'projectReport',
  initialState,
  reducers: {
    clearProjectReportState: (state) => {
      state.projectReport = [];
      state.userTaskReport = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // project report
      .addCase(fetchProjectReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectReport.fulfilled, (state, action) => {
        state.loading = false;
        state.projectReport = action.payload;
      })
      .addCase(fetchProjectReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // user task report
      .addCase(fetchUserTaskReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserTaskReport.fulfilled, (state, action) => {
        state.loading = false;
        state.userTaskReport = action.payload;
      })
      .addCase(fetchUserTaskReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // daily standup report
      .addCase(fetchDailyStandupReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyStandupReport.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyStandupReport = action.payload;
      })
      .addCase(fetchDailyStandupReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // daily standup report
      .addCase(fetchDailyStandupsByDateReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyStandupsByDateReport.fulfilled, (state, action) => {
        state.loading = false;
        state.dateWiseStandupReport = action.payload;
      })
      .addCase(fetchDailyStandupsByDateReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    
    
  },
});

export default reportSlice.reducer;
