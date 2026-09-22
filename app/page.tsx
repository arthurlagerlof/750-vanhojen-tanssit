import { ProductGrid } from "@/components/shop/ProductGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4efe5] text-[#241c18]">
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-[#76584a]">
          Katedralskolan i Åbo
        </p>

        <h1 className="max-w-4xl font-serif text-6xl font-medium tracking-tight sm:text-7xl">
          Historiaa, perinteitä ja hyvää tekemistä.
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-[#65564f]">
          Tervetuloa Katedralskolan kakkutukkuun.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#76584a]">
            Kakkutukku
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            Valitse suosikkisi
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[#65564f]">
            Kaikki rasiat 8,00 €.
          </p>
        </div>

        <ProductGrid />
      </section>
    </main>
  );
}