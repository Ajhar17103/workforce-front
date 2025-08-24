import axiosInstance from '@/lib/axiosInstance';
import { getTaskApiUrl } from '@/utils/api';
import { getSessionStorage } from '@/utils/storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


interface TaskState {
  tasks: any[];
  task: any | null;
  userTasks: any[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  task: null,
  userTasks: [],
  loading: false,
  error: null,
};

// Fetch all tasks
export const fetchTasks = createAsyncThunk(
  'task/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(getTaskApiUrl('/tasks'));
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch tasks');
    }
  },
);

// Fetch single task by ID
export const fetchTaskById = createAsyncThunk(
  'task/fetchTaskById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(getTaskApiUrl(`/tasks/${id}`));
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch task');
    }
  },
);

export const fetchTaskByUserId = createAsyncThunk(
  'task/fetchTaskByUserId',
  async (id: string, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getTaskApiUrl(`/tasks/by-user/${id}`),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch task');
    }
  },
);

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchTaskById
      .addCase(fetchTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchTaskByUserId
      .addCase(fetchTaskByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.userTasks = action.payload;
      })
      .addCase(fetchTaskByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default taskSlice.reducer;
