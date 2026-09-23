"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./CartProvider";

export function CartButton() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/tilaus"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-[#071b35] px-5 py-3 text-sm text-[#f6f1e7] shadow-xl ring-1 ring-[#d6b66a]/40 transition hover:bg-[#0d294b]"
    >
      <ShoppingBag size={18} />

      <span className="hidden sm:inline">
        Ostoskori
      </span>

      {itemCount > 0 && (
        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#d6b66a] px-1.5 text-xs font-medium text-[#071b35]">
          {itemCount}
        </span>
      )}
    </Link>
  );
}