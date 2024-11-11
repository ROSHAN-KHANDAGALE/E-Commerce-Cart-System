import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api/api";

// Thunk Actions
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (info, { rejectWithValue }) => {
    try {
      const response = await api.post("/login", info);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (info, { rejectWithValue }) => {
    try {
      const response = await api.post("/register", info);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const profile = createAsyncThunk(
  "auth/profile",
  async (userData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      const response = await api.get(`/fetchID/${userData.userId}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("34 BE: ", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const profileUpdate = createAsyncThunk(
  "auth/profileUpdate",
  async (userData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      console.log("Data BACKEND 46", userData);
      const response = await api.put(
        `/updateProfile/${userData.userId}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial State
const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  token: null,
};

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.userStatus;
        state.role = action.payload.userStatus.role;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Sign Up
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.userStatus || null;
        state.role = action.payload.userStatus.role;
        state.token = action.payload.token;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Profile
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.userStatus.user;
        state.role = action.payload.userStatus.role || state.role;
      })
      .addCase(profile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // For Profile Update
    builder
      .addCase(profileUpdate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profileUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.userStatus.user;
      })
      .addCase(profileUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
