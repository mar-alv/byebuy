"use client";

import { Product } from "@/components/product";
import { useGetReleases } from "@/services/get-releases";

export function Products() {
  const { data, isFetching } = useGetReleases();

  // TODO: show skeleton
  if (isFetching) return <p>carregando...</p>;

  return (
    <div className="gap-6 flex flex-wrap">
      {data?.products.map((product) => (
        <Product key={`product-card-${product.id}`} product={product} />
      ))}
    </div>
  );
}
