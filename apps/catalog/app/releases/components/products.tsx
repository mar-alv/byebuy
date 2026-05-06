"use client";

import { useGetReleases } from "@/services/get-releases";
import { Product } from "./product";

export function Products() {
  const { data, isFetching } = useGetReleases();

  // TODO: show skeleton
  if (isFetching) return <p>carregando...</p>;

  return (
    <div className="flex flex-wrap">
      {data?.products.map((product) => (
        <Product key={`product-card-${product.id}`} product={product} />
      ))}
    </div>
  );
}
