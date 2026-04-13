"use client";

import { useSignUp } from "@clerk/nextjs";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { env } from "@/env";
import { SignUp, signUpSchema } from "../schemas";

export function SignUpForm() {
  const router = useRouter();
  const { signUp, fetchStatus } = useSignUp();

  const loading = fetchStatus === "fetching";

  const form = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
  });

  async function handleSubmit({
    email,
    password,
    firstName,
    lastName,
  }: SignUp) {
    const { error } = await signUp.password({
      emailAddress: email,
      password,
      firstName,
      lastName,
    });

    if (error || signUp.status !== "complete") {
      toast.error("Não foi possível concluir o cadastro. Tente novamente.");

      return;
    }

    await signUp.finalize({
      navigate: () => router.push(env.NEXT_PUBLIC_CATALOG_URL),
    });
  }

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>
            <Typography.Heading.M>Seu garimpo começa aqui</Typography.Heading.M>
          </FieldLegend>

          <FieldDescription>
            Desapegue do que não usa e encontre o que você precisa
          </FieldDescription>

          {/* TODO: add sign up with google */}

          <FieldSeparator />

          <Typography.Paragraph.S>
            Continuar com endereço de e-mail
          </Typography.Paragraph.S>

          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Nome</FieldLabel>

                    <Input
                      id={field.name}
                      disabled={loading}
                      placeholder="John"
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Sobrenome</FieldLabel>

                    <Input
                      id={field.name}
                      disabled={loading}
                      placeholder="Doe"
                      {...field}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

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
          <Typography.Paragraph.S>Já faz parte?</Typography.Paragraph.S>
          <Button asChild disabled={loading} variant="link" className="p-0">
            <Link href="/sign-in">Bora entrar</Link>
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
