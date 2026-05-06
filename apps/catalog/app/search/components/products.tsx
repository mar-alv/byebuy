"use client";

import { Products as ProductsBase } from "@/components/products";
import { useGetReleases } from "@/services/get-releases";

export function Products() {
  const { data, isFetching } = useGetReleases();

  return <ProductsBase isFetching={isFetching} products={data?.products} />;
}
