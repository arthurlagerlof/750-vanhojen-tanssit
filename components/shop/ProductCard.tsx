"use client";

import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "./CartProvider";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, updateQuantity, getQuantity } = useCart();

  const quantity = getQuantity(product.id);

  function increaseQuantity() {
    addItem(product);
  }

  function decreaseQuantity() {
    updateQuantity(product.id, quantity - 1);
  }

  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl bg-[#faf7f0] shadow-sm ring-1 ring-[#d7c9b5]/60 transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-[#eee7da]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex min-w-0 items-center justify-between gap-4 p-5">
        <div className="min-w-0">
          <h3 className="font-display break-words text-xl leading-tight text-[#241c18] sm:text-2xl">
            {product.name}
          </h3>

          <p className="mt-2 text-sm text-[#66574f]">
            {product.price.toFixed(2).replace(".", ",")} €
          </p>
        </div>

        <div className="flex shrink-0 items-center rounded-full border border-[#a58a55]">
          {quantity > 0 && (
            <>
              <button
                type="button"
                onClick={decreaseQuantity}
                aria-label={`Vähennä tuotteen ${product.name} määrää`}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#542d2c] transition hover:bg-[#542d2c] hover:text-[#faf7f0]"
              >
                <Minus size={16} />
              </button>

              <span
                className="min-w-8 text-center text-sm font-medium text-[#241c18]"
                aria-label={`Määrä: ${quantity}`}
              >
                {quantity}
              </span>
            </>
          )}

          <button
            type="button"
            onClick={increaseQuantity}
            aria-label={`Lisää ${product.name} ostoskoriin`}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#542d2c] transition hover:bg-[#542d2c] hover:text-[#faf7f0]"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}