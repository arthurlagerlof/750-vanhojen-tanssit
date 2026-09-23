import Link from "next/link";
import { Check } from "lucide-react";

interface ThankYouPageProps {
  searchParams: Promise<{
    order?: string;
  }>;
}

export default async function ThankYouPage({
  searchParams,
}: ThankYouPageProps) {
  const params = await searchParams;
  const orderNumber = params.order;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#071b35] px-6 py-20 text-[#f6f1e7]">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d6b66a] text-[#d6b66a]">
          <Check size={28} />
        </div>

        <p className="mt-8 text-xs uppercase tracking-[0.35em] text-[#d6b66a]">
          Tilaus vastaanotettu
        </p>

        <h1 className="font-display mt-4 text-6xl leading-none sm:text-7xl">
          Kiitos tilauksestasi.
        </h1>

        {orderNumber && (
          <div className="mx-auto mt-8 inline-flex flex-col rounded-2xl border border-[#d6b66a]/30 bg-[#0d294b]/50 px-6 py-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8f9dac]">
              Tilausnumero
            </span>

            <span className="mt-1 font-mono text-lg text-[#d6b66a]">
              {orderNumber}
            </span>
          </div>
        )}

        <p className="mx-auto mt-8 max-w-md text-base leading-7 text-[#c7d0da]">
          Ennakkotilauksesi on vastaanotettu.
        </p>

        <div className="mt-8 rounded-2xl border border-[#d6b66a]/30 bg-[#0d294b]/50 p-6 text-left">
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-[#d6b66a]">
            Mitä seuraavaksi?
          </p>

          <p className="mt-4 text-sm leading-7 text-[#c7d0da]">
            Tuotteet toimitetaan marraskuussa 2026. Saat
            sähköpostitse vahvistuksen tilauksestasi sekä myöhemmin
            tarkemmat tiedot maksamisesta ja toimituksesta.
          </p>
        </div>

        <Link
          href="/"
          className="mt-10 inline-flex rounded-full border border-[#d6b66a] px-7 py-3 text-sm uppercase tracking-[0.15em] text-[#f6f1e7] transition hover:bg-[#d6b66a] hover:text-[#071b35]"
        >
          Takaisin etusivulle
        </Link>
      </div>
    </main>
  );
}