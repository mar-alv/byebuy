"use client";

import { useGetAddedProducts } from "@/services/get-added-products";
import { useEffect } from "react";
import { toast } from "sonner";

export function AddedProducts() {
  const { data, error, isFetching } = useGetAddedProducts();

  useEffect(() => {
    if (error) {
      toast.error(
        "Não foi possível listar seus produtos adicionados. Tente novamente.",
      );
    }
  }, [data, error]);

  return (
    <p>
      {data?.products.map((product) => (
        <p>{product.name}</p>
      ))}
    </p>
  );
}
