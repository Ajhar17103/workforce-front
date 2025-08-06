import axiosInstance from "@/lib/axiosInstance";
import { commonOption } from "@/types/common/CommonOption";
import { getUtilityApiUrl } from "@/utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface CountryState {
  countries: commonOption[];
  loading: boolean;
  error: string | null;
}

const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

// 🔄 Async thunk to fetch countries
export const fetchCountries = createAsyncThunk(
  "country/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      const res:any = await axiosInstance.get(getUtilityApiUrl("/countries"));
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Failed to fetch countries");
    }
  }
);

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default countrySlice.reducer;
