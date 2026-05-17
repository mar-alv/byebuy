import { Metadata } from "next";
import { CheckoutPaymentContent } from "./components/payment-content";

export const metadata: Metadata = {
  title: "Pagamento | ByeBuy",
};

export default function CheckoutPaymentPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Pagamento 💳</h1>

        <p className="text-muted-foreground">
          Escolha como deseja pagar e finalize sua compra
        </p>
      </div>

      <CheckoutPaymentContent />
    </div>
  );
}
