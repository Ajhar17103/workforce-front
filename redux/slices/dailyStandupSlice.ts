import axiosInstance from '@/lib/axiosInstance';
import { getStandupiUrl } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


interface DailyStandupState {
  dailyStandups: any[];
  userDailyStandups: any[] | null;
  dateWiseStandups: any[] | null;
  loading: boolean;
  error: string | null;
}


const initialState: DailyStandupState = {
  dailyStandups: [],
  userDailyStandups: [],
  dateWiseStandups: [],
  loading: false,
  error: null,
};

export const fetchDailyStandups = createAsyncThunk(
  'dailyStandup/fetchDailyStandups',
  async (_, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(getStandupiUrl('/daily-standups'));
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to fetch daily standups',
      );
    }
  },
);


export const fetchDailyStandupsByUserId = createAsyncThunk(
  'dailyStandup/fetchDailyStandupsByUserId',
  async (userId: string, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getStandupiUrl(`/daily-standups/by-user/${userId}`),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to fetch user daily standups',
      );
    }
  },
);


export const fetchDailyStandupsByDate = createAsyncThunk(
  'dailyStandup/fetchDailyStandupsByDate',
  async (toDate: string, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getStandupiUrl(`/daily-standups/by-date/${toDate}`),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to fetch daily standups by date',
      );
    }
  },
);


const dailyStandupSlice = createSlice({
  name: 'dailyStandup',
  initialState,
  reducers: {
    clearDailyStandupState: (state) => {
      state.dailyStandups = [];
      state.userDailyStandups = [];
      state.dateWiseStandups = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchDailyStandups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyStandups.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyStandups = action.payload;
      })
      .addCase(fetchDailyStandups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchDailyStandupsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyStandupsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.userDailyStandups = action.payload;
      })
      .addCase(fetchDailyStandupsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchDailyStandupsByDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyStandupsByDate.fulfilled, (state, action) => {
        state.loading = false;
        state.dateWiseStandups = action.payload;
      })
      .addCase(fetchDailyStandupsByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDailyStandupState } = dailyStandupSlice.actions;
export default dailyStandupSlice.reducer;