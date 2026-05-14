import { Search } from "@repo/schemas";
import { useQuery } from "@tanstack/react-query";
import { useCatalogApi } from "../../hooks";

export interface SearchProductsRequest extends Partial<Search> {}

export interface SearchProductsResponse {
  products: ProductData[];
}

export function useSearchProducts({ query }: SearchProductsRequest) {
  const { request } = useCatalogApi();

  return useQuery({
    queryKey: ["searchProducts", query],
    queryFn: () =>
      request<SearchProductsResponse>({
        url: "/search",
        method: "GET",
        params: {
          query,
        },
      }),
  });
}
