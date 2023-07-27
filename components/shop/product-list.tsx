import stripe from "@/lib/stripe";
import { Product } from "@/types";
import Stripe from "stripe";
import ProductCard from "@/components/shop/product-card";

async function getProducts() {
  try {
    const stripeProducts = await stripe.products.list({
      limit: 9,
      expand: ["data.default_price"],
    });

    return stripeProducts.data.map((p: Stripe.Product): Product => {
      return {
        id: p.id.toString(),
        name: p.name,
        description: p.description ?? "",
        price: (p.default_price as Stripe.Price)?.unit_amount_decimal ?? "0",
        currency: (p.default_price as Stripe.Price)?.currency ?? "BRL",
        images: p.images,
        image: p.images[0],
      };
    });
  } catch (e) {
    console.log(e);
  }
}

export default async function ProductList() {
  const products = await getProducts();
  return (
    <section className="grid gap-4 m-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products?.map((p) => (
        <ProductCard {...p} />
      ))}
    </section>
  );
}
