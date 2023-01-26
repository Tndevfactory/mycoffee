import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./features/authSlice";
import coffeeReducer from "./features/coffeeSlice";
// const middleware = [thunk, immutableStateInvariant, serializableStateInvariant];

export const store = configureStore({
  reducer: {
    auth: authReducer,
    coffee: coffeeReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
