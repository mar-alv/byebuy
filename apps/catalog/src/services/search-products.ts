import { Search } from "@repo/schemas";
import { useQuery } from "@tanstack/react-query";
import { request } from "./api";

export interface SearchProductsRequest extends Partial<Search> {}

export interface SearchProductsResponse {
  products: ProductData[];
}

export function useSearchProducts({ query }: SearchProductsRequest) {
  return useQuery({
    queryKey: ["searchProducts", query],
    queryFn: () => searchProducts({ query }),
  });
}

export async function searchProducts({ query }: SearchProductsRequest) {
  return await request<SearchProductsResponse>({
    url: "/search",
    method: "GET",
    params: {
      query,
    },
  });
}
