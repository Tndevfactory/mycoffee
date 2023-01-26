import { api } from "./api";
import { REACT_APP_API_DEV, REACT_APP_API_PRODUCTION } from "@env";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
api.interceptors.request.use(function (config, state) {
  config.headers = { "X-Requested-With": "XMLHttpRequest" };
  config.headers = { Accept: "application/json" };
  config.headers = { "content-type": "application/json" };
  // let token = await retrieveToken();
  // console.log("token from config.axios", token);
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  console.log("REACT_APP_API_DEV ", REACT_APP_API_DEV);
  console.log("config ", config);
  return config;
});

console.log("api ", api);
const initialState = {
  user: {
    googleID: "",
    googleName: "",
    googleEmail: "",
    googlePassword: "",
    googleToken: "",
    googleRefreshToken: "",
    googleAvatar: "",
  },

  loading: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  success: "",
  error: "",
  observer: "",

  loadingbtn: false,
};

export const setAsync = createAsyncThunk(
  "auth/setAsyncStorage",
  async (dt, thunk) => {
    try {
      return " AsyncStorage ";
    } catch (error) {
      return thunk.rejectWithValue("something went wrong");
    }
  }
);

const authSlice = createSlice({
  name: "authAPI",
  initialState,
  reducers: {
    clearSuccess: (state) => {
      state.success = "";
    },
    clearError: (state) => {
      state.error = "";
    },
    clearLoading: (state) => {
      state.loading.isIdle = true;
      state.loading.isPending = false;
      state.loading.isSuccess = false;
    },

    clearObserver: (state) => {
      state.observer = "";
    },
    storeToken: (state, action) => {
      state.token = action.payload;
    },
    setLoadingbtn: (state, action) => {
      state.loadingbtn = action.payload;
    },
    storeUser: (state, action) => {
      // console.log("action.payload ", action.payload);
      const {
        googleID,
        googleName,
        googleEmail,
        googlePassword,
        googleToken,
        googleRefreshToken,
        googleAvatar,
      } = action.payload;
      state.user.googleID = googleID;
      state.user.googleName = googleName;
      state.user.googleEmail = googleEmail;
      state.user.googlePassword = googlePassword;
      state.user.googleToken = googleToken;
      state.user.googleRefreshToken = googleRefreshToken;
      state.user.googleAvatar = googleAvatar;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setAsync.pending, (state, action) => {
      state.loading.isPending = true;
    });
    builder.addCase(setAsync.fulfilled, (state, action) => {
      state.observer = "getSalespoint " + baseURL + "/photos";
      state.loading.isSuccess = true;
    });

    builder.addCase(setAsync.rejected, (state, action) => {
      if (action) {
        state.error = action.error.message;
      } else {
        state.error = "something went wrong ";
      }
    });
  },
});

export const {
  clearSuccess,
  clearError,
  clearLoading,
  clearObserver,
  storeToken,
  storeUser,
  setLoadingbtn,
} = authSlice.actions;

export default authSlice.reducer;
