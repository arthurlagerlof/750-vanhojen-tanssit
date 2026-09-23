import { Hero } from "@/components/hero/Hero";
import { HistoryExperience } from "@/components/history/HistoryExperience";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { CartButton } from "@/components/shop/CartButton";
import { FAQ } from "@/components/faq/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />

      <HistoryExperience />

      <section
        id="shop"
        className="bg-[#f3ede1] px-6 py-28 sm:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-[#76584a]">
              Kakkutukku
            </p>

            <h2 className="font-display mt-4 text-6xl font-medium tracking-tight text-[#241c18] sm:text-7xl">
              Pientä hyvää.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#66574f]">
              Valitse suosikkisi ja tue samalla Katedralskolanin
              750-vuotisjuhlaa ja Vanhojen Tansseja.
            </p>

            <div className="mx-auto mt-8 h-px w-16 bg-[#a58a55]" />
          </div>

          <ProductGrid />
        </div>
      </section>

      <FAQ />

      <CartButton />
    </main>
  );
}