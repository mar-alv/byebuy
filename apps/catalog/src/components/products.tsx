"use client";

import { Product } from "@/components/product";

interface ProductsProps {
  isFetching: boolean;
  products: ProductData[] | undefined;
}

export function Products({ isFetching, products }: ProductsProps) {
  // TODO: show skeleton
  if (isFetching) return <p>carregando...</p>;

  // TODO: redirect if we get an error fetching the product
  // TODO: show no product found page

  return (
    <div className="gap-6 flex flex-wrap">
      {products?.map((product) => (
        <Product key={`product-card-${product.id}`} product={product} />
      ))}
    </div>
  );
}
