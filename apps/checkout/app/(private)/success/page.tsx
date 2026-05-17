import { Metadata } from "next";
import { CheckoutSuccessContent } from "./components/success-content";

export const metadata: Metadata = {
  title: "Compra finalizada | ByeBuy",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">
          Compra finalizada 🎉
        </h1>

        <p className="text-muted-foreground">
          Seu pedido foi realizado com sucesso
        </p>
      </div>

      <CheckoutSuccessContent />
    </div>
  );
}
