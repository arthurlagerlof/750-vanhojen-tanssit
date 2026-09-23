"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid() {
  const [openCategories, setOpenCategories] = useState({
    makeat: true,
    suolaiset: false,
  });

  const makeiset = products.filter(
    (product) => product.category === "makeat",
  );

  const suolaiset = products.filter(
    (product) => product.category === "suolaiset",
  );

  const toggleCategory = (category: "makeat" | "suolaiset") => {
    setOpenCategories((current) => ({
      ...current,
      [category]: !current[category],
    }));
  };

  return (
    <div className="space-y-5">
      {/* Makeiset */}
      <section className="overflow-hidden rounded-2xl border border-[#d7c9b5] bg-[#faf7f0]">
        <button
          type="button"
          onClick={() => toggleCategory("makeat")}
          aria-expanded={openCategories.makeat}
          className="flex w-full items-center justify-between px-6 py-6 text-left transition hover:bg-[#f3ede1] md:px-8"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#a58a55]">
              Makeat
            </p>

            <h3 className="mt-1 font-display text-3xl text-[#241c18] md:text-4xl">
              Makeiset
            </h3>

            <p className="mt-2 text-sm text-[#66574f]">
              {makeiset.length} tuotetta
            </p>
          </div>

          <ChevronDown
            size={24}
            className={`shrink-0 text-[#a58a55] transition-transform duration-300 ${
              openCategories.makeat ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            openCategories.makeat
              ? "grid-rows-[1fr]"
              : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-[#d7c9b5] p-6 md:p-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {makeiset.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suolaiset */}
      <section className="overflow-hidden rounded-2xl border border-[#d7c9b5] bg-[#faf7f0]">
        <button
          type="button"
          onClick={() => toggleCategory("suolaiset")}
          aria-expanded={openCategories.suolaiset}
          className="flex w-full items-center justify-between px-6 py-6 text-left transition hover:bg-[#f3ede1] md:px-8"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#a58a55]">
              Suolaiset
            </p>

            <h3 className="mt-1 font-display text-3xl text-[#241c18] md:text-4xl">
              Suolaiset
            </h3>

            <p className="mt-2 text-sm text-[#66574f]">
              {suolaiset.length} tuotetta
            </p>
          </div>

          <ChevronDown
            size={24}
            className={`shrink-0 text-[#a58a55] transition-transform duration-300 ${
              openCategories.suolaiset ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            openCategories.suolaiset
              ? "grid-rows-[1fr]"
              : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-[#d7c9b5] p-6 md:p-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {suolaiset.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}