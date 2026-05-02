import { urls } from "@repo/configs";
import axios from "axios";

export const api = axios.create({
  baseURL: urls.sellerApi,
  timeout: 5000,
});


/*
import { api } from "./api";
import { getToken } from "@clerk/nextjs"; // or your setup

api.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
*/