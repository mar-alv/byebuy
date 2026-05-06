import { urls } from "@repo/configs";
import Link from "next/link";

export function Logo() {
  return (
    <Link href={urls.catalog}>
      <img
        src="/images/logo.png"
        alt="Logotipo com uma sacola de compras estilizada em tons de laranja, com rosto sorridente e pernas em movimento, acompanhado do texto 'BYEBUY' em fonte arredondada abaixo."
        className="size-18"
      />
    </Link>
  );
}

Logo.NoTexts = function LogoNoTexts() {
  return (
    <Link href={urls.catalog}>
      <img
        src="/images/logo-no-texts.png"
        alt="Logotipo com uma sacola de compras estilizada em tons de laranja, com rosto sorridente e pernas em movimento."
        className="size-18"
      />
    </Link>
  );
};
