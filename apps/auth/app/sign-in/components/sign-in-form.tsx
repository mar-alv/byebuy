"use client";

import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";
import { Typography } from "@repo/ui/components/typography";
import { APP_URLS } from "@repo/ui/config";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { SignIn, signInSchema } from "../schemas";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn, fetchStatus } = useSignIn();

  const loading = fetchStatus === "fetching";

  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
  });

  async function handleSubmit({ email, password }: SignIn) {
    const { error } = await signIn.password({
      emailAddress: email,
      password,
    });

    if (error || signIn.status !== "complete") {
      toast.error("Não foi possível entrar. Tente novamente.");

      return;
    }

    const redirectUrl = searchParams.get("redirect_url") || APP_URLS.catalog;

    await signIn.finalize({
      navigate: () => {
        router.push(redirectUrl);
      },
    });
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>
            <Typography.Heading.M>Voltou, né? 😏</Typography.Heading.M>
          </FieldLegend>

          <FieldDescription>
            Então bora transformar bagunça em dinheiro de novo
          </FieldDescription>

          {/* TODO: add sign in with google */}

          <FieldSeparator />

          <Typography.Paragraph.S>
            Continuar com endereço de e-mail
          </Typography.Paragraph.S>

          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>

                  <Input
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    disabled={loading}
                    placeholder="john.doe@mail.com"
                    {...field}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Senha</FieldLabel>

                  <Input
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    disabled={loading}
                    placeholder="********"
                    type="password"
                    {...field}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>

        <Field orientation="horizontal">
          <Button disabled={loading} size="lg" type="submit" className="w-full">
            Partiu garimpar
          </Button>
        </Field>

        <div className="gap-0.5 flex items-center">
          <Typography.Paragraph.S>Só olhando?</Typography.Paragraph.S>
          <Button asChild disabled={loading} variant="link" className="p-0">
            <Link href="/sign-up">Cria uma conta aí</Link>
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
