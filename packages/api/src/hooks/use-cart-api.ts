"use client";

import { useAuth } from "@clerk/nextjs";
import { urls } from "@repo/configs";
import { createApiClient } from "../client/create-api-client";

export function useCartApi() {
  const { getToken } = useAuth();

  return createApiClient({
    baseURL: urls.cartApi,
    getToken,
  });
}
