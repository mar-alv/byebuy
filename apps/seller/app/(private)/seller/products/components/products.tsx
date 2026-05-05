"use client";

import { useGetAddedProducts } from "@/services/get-added-products";
import { useEffect } from "react";
import { toast } from "sonner";

export function AddedProducts() {
  const { data, error } = useGetAddedProducts();

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
        <p key={product.id}>{product.name}</p>
      ))}
    </p>
  );
}
