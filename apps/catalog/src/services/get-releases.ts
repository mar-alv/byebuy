import { useQuery } from "@tanstack/react-query";
import { request } from "./api";

export interface GetReleasesResponse {
  products: ProductData[];
}

export function useGetReleases() {
  return useQuery({
    queryKey: ["getReleases"],
    queryFn: getReleases,
  });
}

export async function getReleases() {
  return await request<GetReleasesResponse>({
    url: "/releases",
    method: "GET",
  });
}
