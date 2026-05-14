import { useAuthenticatedQuery, useSellerApi } from "../../hooks";

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
  const { request } = useSellerApi();

  return useAuthenticatedQuery({
    queryKey: ["getAddedProducts"],
    queryFn: () =>
      request<GetAddedProductsResponse>({
        url: "/products",
        method: "GET",
      }),
  });
}
