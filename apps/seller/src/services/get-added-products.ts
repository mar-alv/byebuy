import { useQuery } from "@tanstack/react-query";
import { request } from "./api";

interface GetAddedProductsResponse {
  products: {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
		// TODO: add images
  }[];
}

export function useGetAddedProducts() {
  return useQuery({
    queryKey: ["getAddedProducts"],
    queryFn: getAddedProducts,
  });
}

export async function getAddedProducts() {
  return await request<GetAddedProductsResponse>({
    url: "/products",
    method: "GET",
  });
}
