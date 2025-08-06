import axiosInstance from "@/lib/axiosInstance";
import { getUtilityApiUrl } from "@/utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface allowanceState {
  allowances: any[];
  loading: boolean;
  error: string | null;
}

const initialState: allowanceState = {
  allowances: [],
  loading: false,
  error: null,
};

// 🔄 Async thunk to fetch allowances
export const fetchAllowances = createAsyncThunk(
  "allowance/fetchAllowances",
  async (_, { rejectWithValue }) => {
    try {
      const res:any = await axiosInstance.get(getUtilityApiUrl("/allowances"));
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to fetch allowances");
    }
  }
);

const allowanceSlice = createSlice({
  name: "allowance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllowances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllowances.fulfilled, (state, action) => {
        state.loading = false;
        state.allowances = action.payload;
      })
      .addCase(fetchAllowances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default allowanceSlice.reducer;
