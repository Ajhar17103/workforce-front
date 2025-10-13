import axiosInstance from '@/lib/axiosInstance';
import { getLeaveApiUrl } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface LeaveRequestState {
  leaveRequests: any[];
  userLeaveRequests: any[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: LeaveRequestState = {
  leaveRequests: [],
  userLeaveRequests: [],
  loading: false,
  error: null,
};

export const fetchLeaveRequests = createAsyncThunk(
  'leaveRequest/fetchLeaveRequests',
  async (_, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(getLeaveApiUrl('/leave-requests'));
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to fetch leave requests',
      );
    }
  },
);


export const fetchLeaveRequestsByUserId = createAsyncThunk(
  'leaveRequest/fetchLeaveRequestsByUserId',
  async (userId: string, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getLeaveApiUrl(`/leave-requests/by-user/${userId}`),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to fetch user leave requests',
      );
    }
  },
);

const leaveRequestSlice = createSlice({
  name: 'leaveRequest',
  initialState,
  reducers: {
    clearLeaveRequestState: (state) => {
      state.leaveRequests = [];
      state.userLeaveRequests = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaveRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaveRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.leaveRequests = action.payload;
      })
      .addCase(fetchLeaveRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchLeaveRequestsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaveRequestsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.userLeaveRequests = action.payload;
      })
      .addCase(fetchLeaveRequestsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearLeaveRequestState } = leaveRequestSlice.actions;
export default leaveRequestSlice.reducer;
