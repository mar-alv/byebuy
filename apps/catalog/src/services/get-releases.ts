import { useQuery } from "@tanstack/react-query";
import { request } from "./api";

interface GetReleasesResponse {
  products: {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    // TODO: add images
  }[];
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
