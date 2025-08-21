import axiosInstance from '@/lib/axiosInstance';
import { getMasterApiUrl } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface SprintState {
  sprints: any[];
  sprint: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: SprintState = {
  sprints: [],
  sprint: null,
  loading: false,
  error: null,
};

// Fetch all sprints
export const fetchSprints = createAsyncThunk(
  'sprint/fetchSprints',
  async (_, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(getMasterApiUrl('/sprints'));
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch sprints');
    }
  },
);

// Fetch single sprint by ID
export const fetchSprintById = createAsyncThunk(
  'sprint/fetchSprintById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getMasterApiUrl(`/sprints/${id}`),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch sprint');
    }
  },
);

const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchSprints
      .addCase(fetchSprints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSprints.fulfilled, (state, action) => {
        state.loading = false;
        state.sprints = action.payload;
      })
      .addCase(fetchSprints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchSprintById
      .addCase(fetchSprintById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSprintById.fulfilled, (state, action) => {
        state.loading = false;
        state.sprint = action.payload;
      })
      .addCase(fetchSprintById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sprintSlice.reducer;
