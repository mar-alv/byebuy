import { Metadata } from "next";
import { Products } from "./components/products";

export const metadata: Metadata = {
  title: "Busca | ByeBuy",
};

export default function Search() {
  return <Products />;
}
