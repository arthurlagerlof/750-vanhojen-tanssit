import Link from "next/link";
import { Check } from "lucide-react";

export default function ThankYouPage() {
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

        <p className="mx-auto mt-8 max-w-md text-base leading-7 text-[#c7d0da]">
          Saat pian sähköpostiisi vahvistuksen tilauksestasi.
          Kiitos, että tuet Katedralskolanin 750-vuotisjuhlaa
          ja Vanhojen Tansseja.
        </p>

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