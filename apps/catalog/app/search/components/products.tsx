"use client";

import { Products as ProductsBase } from "@/components/products";
import { useSearchProducts } from "@/services/search-products";
import { useSearchParams } from "next/navigation";

export function Products() {
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? undefined;

  const { data, isFetching } = useSearchProducts({ query });

  return <ProductsBase isFetching={isFetching} products={data?.products} />;
}
