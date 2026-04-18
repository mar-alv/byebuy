import { Metadata } from "next";
import { AddProductForm } from "./components/add-product-form";

export const metadata: Metadata = {
  title: "Adicionar Produto | ByeBuy",
};

export default function SellerAddProduct() {
  return <AddProductForm />;
}
