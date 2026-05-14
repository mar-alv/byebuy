"use client";

import { useAuth } from "@clerk/nextjs";
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  type MutationFunctionContext,
} from "@tanstack/react-query";

export function useAuthenticatedMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> {
  const { isLoaded, isSignedIn } = useAuth();

  return useMutation({
    ...options,

    mutationFn: async (
      variables: TVariables,
      context: MutationFunctionContext,
    ) => {
      if (!isLoaded || !isSignedIn) {
        throw new Error("Authentication not ready");
      }

      if (!options.mutationFn) {
        throw new Error("mutationFn is required");
      }

      return options.mutationFn(variables, context);
    },
  });
}
