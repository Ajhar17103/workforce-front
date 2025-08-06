import axiosInstance from "@/lib/axiosInstance";
import { getUtilityApiUrl } from "@/utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface missionState {
  missions: any[];
  loading: boolean;
  error: string | null;
}

const initialState: missionState = {
  missions: [],
  loading: false,
  error: null,
};

// 🔄 Async thunk to fetch missions
export const fetchMissions = createAsyncThunk(
  "mission/fetchMissions",
  async (_, { rejectWithValue }) => {
    try {
      const res:any = await axiosInstance.get(getUtilityApiUrl("/missions"));
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to fetch missions");
    }
  }
);

const missionSlice = createSlice({
  name: "mission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.loading = false;
        state.missions = action.payload;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default missionSlice.reducer;
