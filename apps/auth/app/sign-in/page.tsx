import { Logo } from "@repo/ui/components/logo";
import Image from "next/image";
import { SignInForm } from "./components/sign-in-form";

export default function SignIn() {
  return (
    <>
      <div className="max-w-124 flex flex-col justify-center p-8 relative">
        <div className="absolute top-0">
          <Logo />
        </div>
        <SignInForm />
      </div>

      <div className="relative hidden md:block">
        <Image
          src="/images/sign-in-banner.jpg"
          alt=""
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </>
  );
}
