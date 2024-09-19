// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../services/auth-service';
// Thunk to handle async login action
export const login = createAsyncThunk(
  'auth/login',
  async (user, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(user);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to handle async register action
export const register = createAsyncThunk(
  'auth/register',
  async (user, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(user);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      if (AuthService.isTokenExpired()) {
        dispatch(logout());
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Initial state for auth slice
const initialState = {
  user: AuthService.getUser() || null,
  token: AuthService.getToken() || null,
  isAuthenticated: AuthService.isAuthenticated(),
  loading: false,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      AuthService.logout();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkAuthStatus.fulfilled, (state) => {
        state.isAuthenticated = AuthService.isAuthenticated();
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
