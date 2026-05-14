"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export function useAuthenticatedQuery<T>({
  queryKey,
  queryFn,
  ...options
}: UseQueryOptions<T>) {
  const { isLoaded, isSignedIn } = useAuth();

  return useQuery({
    queryKey,
    queryFn,
    enabled: (options.enabled ?? true) && isLoaded && isSignedIn,
    ...options,
  });
}
