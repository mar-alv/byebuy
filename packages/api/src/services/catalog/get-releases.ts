import { useQuery } from "@tanstack/react-query";
import { useCatalogApi } from "../../hooks";

export interface GetReleasesResponse {
  products: ProductData[];
}

export function useGetReleases() {
  const { request } = useCatalogApi();

  return useQuery({
    queryKey: ["getReleases"],
    queryFn: () =>
      request<GetReleasesResponse>({
        url: "/releases",
        method: "GET",
      }),
  });
}
