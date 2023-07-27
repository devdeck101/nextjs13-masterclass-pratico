"use client";
import { useShoppingCart } from "use-shopping-cart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader, Trash2 } from "lucide-react";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function Cart() {
  const { cartCount, cartDetails, redirectToCheckout } = useShoppingCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  async function checkout() {
    setIsCheckingOut(true);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartDetails),
    });

    const { id } = await response.json();

    const result = await redirectToCheckout(id);
    setIsCheckingOut(false);
  }

  return (
    <section className="container flex flex-col my-2 space-y-2">
      {cartDetails &&
        Object.keys(cartDetails).map((key) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle className="tracking-wider">
                {cartDetails[key].name} ({cartDetails[key].quantity})
              </CardTitle>
              <CardDescription className="text-md tracking-wide">
                {cartDetails[key].description}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="relative w-28 h-28">
                    <Image
                      src={cartDetails[key].image || ""}
                      fill
                      alt={cartDetails[key].name}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-md font-medium leading-none">Preço</p>
                    <p className="text-md text-muted-foreground">
                      {cartDetails[key].formattedValue}
                    </p>
                  </div>
                </div>
                <Trash2 className="text-red-400 hover:text-red-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      <div
        className={cn(
          "flex items-center justify-end",
          cartCount === undefined || cartCount <= 0 ? "hidden" : ""
        )}
      >
        <Button
          variant={"default"}
          size={"lg"}
          onClick={checkout}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? (
            <div className="flex items-center justify-between gap-2">
              <Loader className="animate-spin 2s repeat-infinite" />{" "}
              Finalizando...
            </div>
          ) : (
            "Finalizar"
          )}
        </Button>
      </div>
    </section>
  );
}
