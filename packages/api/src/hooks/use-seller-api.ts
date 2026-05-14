"use client";

import { useAuth } from "@clerk/nextjs";
import { urls } from "@repo/configs";
import { createApiClient } from "../client/create-api-client";

export function useSellerApi() {
  const { getToken } = useAuth();

  return createApiClient({
    baseURL: urls.sellerApi,
    getToken,
  });
}
