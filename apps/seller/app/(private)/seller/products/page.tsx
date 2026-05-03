import { Metadata } from "next";
import { AddedProducts } from "./components/products";

export const metadata: Metadata = {
  title: "Produtos Adicionados | ByeBuy",
};

export default function SellerProducts() {
  return <AddedProducts />;
}
