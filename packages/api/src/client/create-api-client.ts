import axios, { type AxiosRequestConfig } from "axios";

export interface CreateApiClientOptions {
  baseURL: string;
  getToken?: () => Promise<string | null>;
}

export function createApiClient({ baseURL, getToken }: CreateApiClientOptions) {
  const api = axios.create({
    baseURL,
    timeout: 5000,
  });

  api.interceptors.request.use(async (config) => {
    if (!getToken) return config;

    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  async function request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await api.request<T>(config);

    return response.data;
  }

  return {
    api,
    request,
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;
