import { Logo } from "@repo/ui/components/logo";
import { Metadata } from "next";
import Image from "next/image";
import { SignUpForm } from "./components/sign-up-form";

export const metadata: Metadata = {
  title: "Criar Conta | ByeBuy",
  description: "Desapegue do que não usa e encontre o que você precisa",
};

export default function SignUp() {
  return (
    <>
      <div className="max-w-124 flex flex-col justify-center p-8 relative">
        <div className="absolute top-0">
          <Logo />
        </div>
        <SignUpForm />
      </div>

      <div className="relative hidden md:block">
        <Image
          src="/images/sign-up-banner.jpg"
          alt=""
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </>
  );
}
