import axiosInstance from '@/lib/axiosInstance';
import { getMasterApiUrl } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface deparmentState {
  deparments: any[];
  loading: boolean;
  error: string | null;
}

const initialState: deparmentState = {
  deparments: [],
  loading: false,
  error: null,
};

export const fetchDeparments = createAsyncThunk(
  'menu/fetchDeparments',
  async (_, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(getMasterApiUrl('/departments'));
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch departments');
    }
  },
);

const deparmentSlice = createSlice({
  name: 'deparment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeparments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeparments.fulfilled, (state, action) => {
        state.loading = false;
        state.deparments = action.payload;
      })
      .addCase(fetchDeparments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default deparmentSlice.reducer;
