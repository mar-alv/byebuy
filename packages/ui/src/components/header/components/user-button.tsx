"use client";

import { Show, useClerk, useUser } from "@clerk/nextjs";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { Skeleton } from "../../ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Typography } from "../../typography";
import { APP_URLS } from "../../../config";

export function UserButton() {
  const { signOut } = useClerk();
  const router = useRouter();
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <Skeleton className="h-[1.2rem] w-[1.2rem] rounded-full" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <User className="h-[1.2rem] w-[1.2rem] scale-100 transition-all" />

          <Show when="signed-in">
            <Typography.Paragraph.S>
              {user?.firstName || "Conta"}
            </Typography.Paragraph.S>
          </Show>

          <Show when="signed-out">
            <Typography.Paragraph.S>Conta</Typography.Paragraph.S>
          </Show>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-fit">
        <Show when="signed-in">
          <DropdownMenuItem
            onClick={() =>
              router.push(`${APP_URLS.seller}/seller/products/add`)
            }
          >
            Adicionar produto
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => signOut({ redirectUrl: `${APP_URLS.auth}/sign-in` })}
          >
            Sair
          </DropdownMenuItem>
        </Show>

        <Show when="signed-out">
          <DropdownMenuItem
            onClick={() => router.push(`${APP_URLS.auth}/sign-in`)}
          >
            Entrar
          </DropdownMenuItem>
        </Show>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
