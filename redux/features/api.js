import axios from "axios";
import React, { useEffect, useState } from "react";
import { REACT_APP_API_DEV, REACT_APP_API_PRODUCTION } from "@env";
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
