import axiosInstance from '@/lib/axiosInstance';
import { getMasterApiUrl } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface departmentState {
  departments: any[];
  department: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: departmentState = {
  departments: [],
  department: null,
  loading: false,
  error: null,
};

export const fetchDepartments = createAsyncThunk(
  'department/fetchDepartments',
  async (_, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(getMasterApiUrl('/departments'));
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch departments');
    }
  },
);

export const fetchDepartmentById = createAsyncThunk(
  'department/fetchDepartmentById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getMasterApiUrl(`/departments/${id}`),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch department');
    }
  },
);

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔹 Get All
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🔹 Get By ID
      .addCase(fetchDepartmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.department = action.payload;
      })
      .addCase(fetchDepartmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default departmentSlice.reducer;
