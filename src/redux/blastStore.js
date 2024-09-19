// src/redux/blastSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BlastService from '../services/blast-service';

// Thunk to handle async blast creation
export const createBlast = createAsyncThunk(
  'user/create',
  async (blastData, { rejectWithValue }) => {
    try {
      const response = await BlastService.createBlast(blastData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to handle fetching all blasts
export const getAllBlasts = createAsyncThunk(
  'blast/getAllBlasts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await BlastService.getAllBlasts();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to handle fetching broadcast history
export const getBroadcastHistory = createAsyncThunk(
  'blast/getBroadcastHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await BlastService.getBroadcastHistory();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const blastNow = createAsyncThunk(
  'user/blast-now',
  async (blastData, { rejectWithValue }) => {
    try {
      const response = await BlastService.blastNow(blastData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editBlast = createAsyncThunk(
  'user/editBlast/:id',
  async (blastData, { rejectWithValue }) => {
    try {
      const response = await BlastService.editBlast(blastData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBlast = createAsyncThunk(
  'user/deleteBlast',
  async (blastData, { rejectWithValue }) => {
    try {
      const response = await BlastService.deleteBlast(blastData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Initial state for blast slice
const initialState = {
  blasts: [],
  history: [],
  loading: false,
  error: null,
};

// Blast slice
const blastSlice = createSlice({
  name: 'blast',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // createBlast
    builder
      .addCase(createBlast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlast.fulfilled, (state, action) => {
        state.loading = false;
        state.blasts.push(action.payload); // Add new blast to blasts array
      })
      .addCase(createBlast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // getAllBlasts
    builder
      .addCase(getAllBlasts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBlasts.fulfilled, (state, action) => {
        state.loading = false;
        state.blasts = action.payload; // Set blasts data
      })
      .addCase(getAllBlasts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // getBroadcastHistory
    builder
      .addCase(getBroadcastHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBroadcastHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload; // Set blasts data
      })
      .addCase(getBroadcastHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(blastNow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blastNow.fulfilled, (state, action) => {
        state.loading = false;
        state.blasts = action.payload; // Set blasts data
      })
      .addCase(blastNow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(editBlast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBlast.fulfilled, (state, action) => {
        state.loading = false;
        state.blasts = action.payload;
      })
      .addCase(editBlast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteBlast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlast.fulfilled, (state, action) => {
        state.loading = false;
        state.blasts = action.payload; // Set blasts data
      })
      .addCase(deleteBlast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default blastSlice.reducer;
