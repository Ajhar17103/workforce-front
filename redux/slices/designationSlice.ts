import axiosInstance from '@/lib/axiosInstance';
import { getMasterApiUrl } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface DesignationState {
  designations: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DesignationState = {
  designations: [],
  loading: false,
  error: null,
};

export const fetchDesignations = createAsyncThunk(
  'menu/fetchDesignations',
  async (_, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getMasterApiUrl('/designations'),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch designations');
    }
  },
);

const designationSlice = createSlice({
  name: 'designation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesignations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDesignations.fulfilled, (state, action) => {
        state.loading = false;
        state.designations = action.payload;
      })
      .addCase(fetchDesignations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default designationSlice.reducer;
