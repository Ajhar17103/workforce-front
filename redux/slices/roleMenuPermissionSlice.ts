import axiosInstance from '@/lib/axiosInstance';
import { getMasterApiUrl } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface RoleMenuPermissionState {
  roleMenuPermissions: any[];
  loading: boolean;
  error: string | null;
}

const initialState: RoleMenuPermissionState = {
  roleMenuPermissions: [],
  loading: false,
  error: null,
};

export const fetchRoleMenuPermissions = createAsyncThunk(
  'roleMenuPermissions/fetchByRoleId',
  async (roleId: number, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getMasterApiUrl(`/role-menu-permissions/${roleId}`),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(
        err?.message || 'Failed to fetch role menu permissions',
      );
    }
  },
);

const roleMenuPermissionSlice = createSlice({
  name: 'roleMenuPermissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoleMenuPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoleMenuPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.roleMenuPermissions = action.payload;
      })
      .addCase(fetchRoleMenuPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default roleMenuPermissionSlice.reducer;
