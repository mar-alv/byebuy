import { getToken } from "@clerk/nextjs";
import { AddProduct } from "@repo/schemas";
import to from "await-to-js";
import { AxiosResponse } from "axios";
import { api } from "./api";

interface AddProductResponse {
  productId: string;
}

export async function addProduct(
  req: AddProduct,
): Promise<[Error | null, AddProductResponse | undefined]> {
	console.log('req', req);
	
  const token = await getToken();

  const [error, data] = await to<AxiosResponse<AddProductResponse>>(
    api.post<AddProductResponse>("/products", req, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );

  return [error, data?.data];
}
