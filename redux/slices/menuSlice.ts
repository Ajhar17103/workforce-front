import axiosInstance from '@/lib/axiosInstance';
import { getMasterApiUrl } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface MenuState {
  menus: any[];
  menu: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  menus: [],
  menu: null,
  loading: false,
  error: null,
};

export const fetchMenus = createAsyncThunk(
  'menu/fetchMenus',
  async (_, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(getMasterApiUrl('/menus'));
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch menus');
    }
  },
);

export const fetchMenuById = createAsyncThunk(
  'menu/fetchMenuById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(getMasterApiUrl(`/menus/${id}`));
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch menu');
    }
  },
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchMenuById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuById.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = action.payload;
      })
      .addCase(fetchMenuById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default menuSlice.reducer;
