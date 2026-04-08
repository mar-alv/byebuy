"use client";

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
import { Controller, useForm } from "react-hook-form";
import { SignIn, signInSchema } from "../schemas";

export function SignInForm() {
  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
  });

  function onSubmit(data: SignIn) {
    console.log(data);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>
            <Typography.Heading.M>bye 👋 buy 🛍️</Typography.Heading.M>
          </FieldLegend>

          <FieldDescription>
            Desapegue do que não usa e encontre o que você precisa
          </FieldDescription>

          <button>Entrar com Google</button>

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
                    placeholder="********"
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
          <Button size="lg" type="submit">
            Partiu garimpar
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
