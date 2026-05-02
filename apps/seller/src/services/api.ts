import { getToken } from "@clerk/nextjs";
import { urls } from "@repo/configs";
import to from "await-to-js";
import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: urls.sellerApi,
  timeout: 5000,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export async function request<T>(
  config: AxiosRequestConfig,
): Promise<[Error, undefined] | [null, T]> {
  const result = await to(api.request<T>(config));

  if (result[0] !== null) {
    return [result[0], undefined];
  }

  const response = result[1];

  return [null, response.data];
}
