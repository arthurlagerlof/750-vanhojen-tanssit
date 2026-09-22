import Image from "next/image";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#d8cdbd] bg-[#faf7f0]">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <h3 className="font-serif text-xl">{product.name}</h3>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-medium">8,00 €</span>

          <button
            type="button"
            className="rounded-full bg-[#3b2520] px-4 py-2 text-sm text-[#f9f4ea] transition hover:bg-[#51342c]"
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}