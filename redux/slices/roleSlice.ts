import axiosInstance from '@/lib/axiosInstance';
import { getMasterApiUrl } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface RoleState {
  roles: any[];
  role: any | null; // single role
  loading: boolean;
  error: string | null;
}

const initialState: RoleState = {
  roles: [],
  role: null,
  loading: false,
  error: null,
};

export const fetchRoles = createAsyncThunk(
  'role/fetchRoles',
  async (_, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(getMasterApiUrl('/roles'));
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch roles');
    }
  },
);

export const fetchRoleById = createAsyncThunk(
  'role/fetchRoleById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(getMasterApiUrl(`/roles/${id}`));
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch role');
    }
  },
);

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchRoleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoleById.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload;
      })
      .addCase(fetchRoleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default roleSlice.reducer;
