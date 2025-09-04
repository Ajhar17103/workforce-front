import axiosInstance from '@/lib/axiosInstance';
import { getAttendanceApiUrl } from '@/utils/api'; // you can rename to getApiUrl if more generic
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface AttendanceState {
  attendances: any[];
  attendance: any | null;
  userAttendances: any[] | null;
  userWorkWiseDateAttendance: any| null;
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  attendances: [],
  attendance: null,
  userAttendances: [],
  userWorkWiseDateAttendance: [],
  loading: false,
  error: null,
};

// Fetch all attendances
export const fetchAttendances = createAsyncThunk(
  'attendance/fetchAttendances',
  async (_, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getAttendanceApiUrl('/attendances'),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch attendances');
    }
  },
);

// Fetch single attendance by ID
export const fetchAttendanceById = createAsyncThunk(
  'attendance/fetchAttendanceById',
  async (id: string, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getAttendanceApiUrl(`/attendances/${id}`),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch attendance');
    }
  },
);

// Fetch attendances by user ID
export const fetchAttendanceByUserId = createAsyncThunk(
  'attendance/fetchAttendanceByUserId',
  async (id: string, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.get(
        getAttendanceApiUrl(`/attendances/by-user/${id}`),
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch attendances');
    }
  },
);

export const fetchAttendanceByUserIdAndWorkDate = createAsyncThunk(
  'attendance/fetchAttendanceByUserIdAndWorkDate',
  async (postData: any, { rejectWithValue }) => {
    try {
      const res: any = await axiosInstance.post(
        getAttendanceApiUrl(`/attendances/by-user-work-date`),
        postData,
      );
      return res.data.payload;
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Failed to fetch attendances');
    }
  },
);

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAttendances
      .addCase(fetchAttendances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendances.fulfilled, (state, action) => {
        state.loading = false;
        state.attendances = action.payload;
      })
      .addCase(fetchAttendances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchAttendanceById
      .addCase(fetchAttendanceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceById.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload;
      })
      .addCase(fetchAttendanceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchAttendanceByUserId
      .addCase(fetchAttendanceByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.userAttendances = action.payload;
      })
      .addCase(fetchAttendanceByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchAttendanceByUserIdAndWorkDate
      .addCase(fetchAttendanceByUserIdAndWorkDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAttendanceByUserIdAndWorkDate.fulfilled,
        (state, action) => {
          state.loading = false;
          state.userWorkWiseDateAttendance = action.payload;
        },
      )
      .addCase(fetchAttendanceByUserIdAndWorkDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default attendanceSlice.reducer;
