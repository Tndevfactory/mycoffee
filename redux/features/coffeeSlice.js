// import { api } from "./api";
import { REACT_APP_API_DEV, REACT_APP_API_PRODUCTION } from "@env";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import React, { useEffect, useState } from "react";
// import { REACT_APP_API_DEV, REACT_APP_API_PRODUCTION } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

let baseURL = REACT_APP_API_DEV;

const environment = process.env.NODE_ENV;

console.log(environment);

if (environment === "development") {
  console.log("environment", environment);
  baseURL = REACT_APP_API_DEV;
} else {
  console.log("environment", environment);
  baseURL = REACT_APP_API_PRODUCTION;
}

const retrieveToken = async () => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    return token;
  } else {
    return null;
  }
};

export const api = axios.create({
  baseURL: baseURL,
});
api.interceptors.request.use(function (config, state) {
  config.headers = { "X-Requested-With": "XMLHttpRequest" };
  config.headers = { Accept: "application/json" };
  config.headers = { "content-type": "application/json" };
  // let token = await retrieveToken();
  // console.log("token from config.axios", token);
  // config.headers.Authorization = token ? `Bearer ${token}` : "";
  console.log("REACT_APP_API_DEV ", REACT_APP_API_DEV);
  console.log("config ", config);
  return config;
});
console.log("baseURL ", baseURL);
console.log("api ", api);

console.log("api ", api);
const initialState = {
  salespoints: [],
  salespoint: {},
  loading: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  success: "",
  error: "",
  observer: "",
};

export const getSalespoints = createAsyncThunk(
  "salesPoints/getSalesPoints",
  async (id, thunk) => {
    try {
      // const resp = await api.get("/photos");
      const resp = await api.get("/salespointView");
      return resp.data;
    } catch (error) {
      return thunk.rejectWithValue("something went wrong");
    }
  }
);
export const getSalespoint = createAsyncThunk(
  "salesPoints/getSalesPoint",
  async (id, thunk) => {
    try {
      const resp = await api.get(`/salespointView/${id}`);
      return resp.data;
    } catch (error) {
      return thunk.rejectWithValue("something went wrong");
    }
  }
);

export const getProduct = createAsyncThunk(
  "salesPoints/getProduct",
  async (dt, thunk) => {
    try {
      const resp = await api.get(
        `/salespointView/${dt.salepointId}/${dt.productId}`
      );
      return resp.data;
    } catch (error) {
      return thunk.rejectWithValue("something went wrong");
    }
  }
);
const coffeeSlice = createSlice({
  name: "salesPointsAPI",
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
  },
  extraReducers: (builder) => {
    builder.addCase(getSalespoints.pending, (state, action) => {
      state.loading.isPending = true;
      state.observer = "getSalespoint-pending " + baseURL + "/getSalespoints";
      console.log("pending; ", "/getSalespoints");
    });
    builder.addCase(getSalespoints.fulfilled, (state, action) => {
      state.salespoints = action.payload;
      state.observer = "getSalespoint-fulfilled " + baseURL + "/getSalespoints";
      state.loading.isSuccess = true;
      console.log("salespoints  ", JSON.stringify(state.salespoints));
    });

    builder.addCase(getSalespoints.rejected, (state, action) => {
      if (action) {
        state.error = action.error.message;
        console.log("rejected; ", action.error.message);
      } else {
        state.error = "something went wrong ";
      }
    });

    builder.addCase(getSalespoint.pending, (state, action) => {
      state.loading.isPending = true;
    });
    builder.addCase(getSalespoint.fulfilled, (state, action) => {
      state.salespoint = action.payload;
      state.observer = `getSalespoint ` + baseURL + "/getSalespointdetails/id";
      state.loading.isSuccess = true;
    });

    builder.addCase(getSalespoint.rejected, (state, action) => {
      if (action) {
        state.error = action.error.message;
      } else {
        state.error = "something went wrong ";
      }
    });
    builder.addCase(getProduct.pending, (state, action) => {
      state.loading.isPending = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.success = action.payload;
      console.log("state.success  ", state.success);
      state.loading.isSuccess = true;
    });

    builder.addCase(getProduct.rejected, (state, action) => {
      if (action) {
        state.error = action.error.message;
        console.log("state.error  ", state.error);
      } else {
        state.error = "something went wrong ";
        console.log("state.error  ", state.error);
      }
    });
  },
});

export const { clearSuccess, clearError, clearLoading, clearObserver } =
  coffeeSlice.actions;

export default coffeeSlice.reducer;
