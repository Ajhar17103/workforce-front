import axiosInstance from '@/lib/axiosInstance';
import { getMasterApiUrl } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface SprintState {
  sprints: any[];
  sprint: any | null;
  projectSprints: any[]; 
  loading: boolean;
  error: string | null;
}

const initialState: SprintState = {
  sprints: [],
  sprint: null,
  projectSprints: [],
  loading: false,
  error: null,
};

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

export const fetchSprintsByProject = createAsyncThunk(
  'sprint/fetchSprintsByProject',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getMasterApiUrl(`/sprints/by-project/${projectId}`),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch project sprints');
    }
  },
);

const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      })

      .addCase(fetchSprintsByProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSprintsByProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projectSprints = action.payload;
      })
      .addCase(fetchSprintsByProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sprintSlice.reducer;