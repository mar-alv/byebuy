"use client";

import { useGetReleases } from "@/services/get-releases";

export function Products() {
  const { data, isFetching } = useGetReleases();

  if (isFetching) return <p>carregando...</p>;

  return (
    <div>
      {data?.products.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  );
}
