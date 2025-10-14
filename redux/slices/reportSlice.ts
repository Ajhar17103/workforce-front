import axiosInstance from '@/lib/axiosInstance';
import { getReportApiUrl } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface ProjectReportState {
  projectReport: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectReportState = {
  projectReport: [],
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

const projectReportSlice = createSlice({
  name: 'projectReport',
  initialState,
  reducers: {
    clearProjectReportState: (state) => {
      state.projectReport = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { clearProjectReportState } = projectReportSlice.actions;
export default projectReportSlice.reducer;
