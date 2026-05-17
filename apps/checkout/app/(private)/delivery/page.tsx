import { Metadata } from "next";
import { CheckoutDeliveryContent } from "./components/delivery-content";

export const metadata: Metadata = {
  title: "Entrega | ByeBuy",
};

export default function CheckoutDeliveryPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Entrega 📦</h1>

        <p className="text-muted-foreground">
          Escolha como você quer receber cada produto
        </p>
      </div>

      <CheckoutDeliveryContent />
    </div>
  );
}
