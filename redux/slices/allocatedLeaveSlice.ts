import axiosInstance from '@/lib/axiosInstance'; // You can rename your util for reuse
import { AllocatedLeaveDto } from '@/types/my-leave/my-leave.type';
import { getLeaveApiUrl } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define State Interface
interface AllocatedLeaveState {
  allocatedLeaves: any[];
  userAllocatedLeaves: AllocatedLeaveDto | null;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: AllocatedLeaveState = {
  allocatedLeaves: [],
  userAllocatedLeaves: null,
  loading: false,
  error: null,
};

// Fetch all allocated leaves
export const fetchAllocatedLeaves = createAsyncThunk(
  'allocatedLeave/fetchAllocatedLeaves',
  async (_, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getLeaveApiUrl('/allocated-leaves'),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to fetch allocated leaves',
      );
    }
  },
);

// Fetch allocated leaves by user ID
export const fetchAllocatedLeavesByUserId = createAsyncThunk(
  'allocatedLeave/fetchAllocatedLeavesByUserId',
  async (userId: string, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getLeaveApiUrl(`/allocated-leaves/by-user/${userId}`),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to fetch allocated leaves for user',
      );
    }
  },
);

// Slice
const allocatedLeaveSlice = createSlice({
  name: 'allocatedLeave',
  initialState,
  reducers: {
    clearAllocatedLeaveState: (state) => {
      state.allocatedLeaves = [];
      state.userAllocatedLeaves = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAllocatedLeaves
      .addCase(fetchAllocatedLeaves.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllocatedLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.allocatedLeaves = action.payload;
      })
      .addCase(fetchAllocatedLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchAllocatedLeavesByUserId
      .addCase(fetchAllocatedLeavesByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllocatedLeavesByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.userAllocatedLeaves = action.payload || null;
      })
      .addCase(fetchAllocatedLeavesByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAllocatedLeaveState } = allocatedLeaveSlice.actions;
export default allocatedLeaveSlice.reducer;
