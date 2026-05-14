import { Metadata } from "next";
import { Products } from "./components/products";

export const metadata: Metadata = {
  title: "Lançamentos | ByeBuy",
};

export default function Releases() {
  return <Products />;
}
