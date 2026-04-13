"use client";

import { Show, useUser } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "../../ui/sheet";
import { Skeleton } from "../../ui/skeleton";

export function FavoritesButton() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  // TODO: fetch favorited products

  if (!isLoaded) {
    return <Skeleton className="h-[1.2rem] w-[1.2rem] rounded-full" />;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          {/* TODO: change fill/bg-color on hover */}
          <Heart className="h-[1.2rem] w-[1.2rem] scale-100 transition-all" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          {/* TODO: change texts */}
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>This action cannot be undone.</SheetDescription>

          <Show when="signed-in">
            {/* TODO: show favorited products or empty text */}
          </Show>

          <Show when="signed-out">
            {/* TODO: show text recommending login to see favorited products */}
          </Show>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
