import { Metadata } from "next";
import { CartContent } from "./components/cart-content";

export const metadata: Metadata = {
  title: "Carrinho | ByeBuy",
};

export default function Cart() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">
          Seu carrinho 🛒
        </h1>

        <p className="text-muted-foreground">
          Confere os itens antes de fechar negócio
        </p>
      </div>

      <CartContent />
    </div>
  );
}
