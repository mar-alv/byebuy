import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../ui/button";
import { Field, FieldError, FieldGroup, FieldSet } from "../../../ui/field";
import { Input } from "../../../ui/input";
import { Search as SearchSchema, searchSchema } from "./schema";

export function Search() {
  const form = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
  });

  async function handleSubmit({ query }: SearchSchema) {
    // TODO: redirect to search page
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="w-full items-center  self-end relative"
    >
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <Controller
              name="query"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Buscar..."
                    className="w-full"
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
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="absolute top-0 right-0"
          >
            <SearchIcon />
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
