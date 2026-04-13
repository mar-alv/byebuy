// TODO: add home redirect
export function Logo() {
  return (
    <img
      src="/images/logo.png"
      alt="Logotipo com uma sacola de compras estilizada em tons de laranja, com rosto sorridente e pernas em movimento, acompanhado do texto 'BYEBUY' em fonte arredondada abaixo."
      className="size-18"
    />
  );
}

// TODO: add home redirect
Logo.NoTexts = function LogoNoTexts() {
  return (
    <img
      src="/images/logo-no-texts.png"
      alt="Logotipo com uma sacola de compras estilizada em tons de laranja, com rosto sorridente e pernas em movimento."
      className="size-18"
    />
  );
};
