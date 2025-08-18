import axiosInstance from '@/lib/axiosInstance';
import { getMasterApiUrl } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface DesignationState {
  designations: any[];
  designation: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: DesignationState = {
  designations: [],
  designation: null,
  loading: false,
  error: null,
};

export const fetchDesignations = createAsyncThunk(
  'designation/fetchDesignations',
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

export const fetchDesignationById = createAsyncThunk(
  'designation/fetchDesignationById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getMasterApiUrl(`/designations/by-department/${id}`),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch designation');
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
      })

      .addCase(fetchDesignationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDesignationById.fulfilled, (state, action) => {
        state.loading = false;
        state.designation = action.payload;
      })
      .addCase(fetchDesignationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default designationSlice.reducer;
