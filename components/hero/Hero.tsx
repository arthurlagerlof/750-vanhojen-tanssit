import { ArrowDown, Heart } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#071b35] text-[#f6f1e7]">
      {/* Decorative architectural lines */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute left-1/2 top-0 h-full w-px bg-[#d6b66a]" />
        <div className="absolute left-[20%] top-0 h-full w-px bg-[#d6b66a]" />
        <div className="absolute right-[20%] top-0 h-full w-px bg-[#d6b66a]" />
      </div>

      {/* Faint medieval-inspired pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#d6b66a_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#d6b66a_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="mb-8 text-xs uppercase tracking-[0.45em] text-[#d6b66a]">
          Katedralskolan i Åbo
        </p>

        <h1 className="font-display max-w-5xl text-7xl font-medium leading-[0.9] tracking-tight sm:text-8xl lg:text-[10rem]">
          Vuosisatojen
          <br />
          tarina.
        </h1>

        <p className="mt-10 max-w-xl text-base leading-7 text-[#c7d0da] sm:text-lg">
          Turun sydämessä, historian keskellä.
          <br />
          Tutustu Katedralskolanin tarinaan ja tue
          koulumme 750v vanhojen tansseja.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#historia"
            className="inline-flex items-center justify-center gap-3 rounded-full border border-[#d6b66a] px-7 py-3 text-sm uppercase tracking-[0.18em] text-[#f6f1e7] transition hover:bg-[#d6b66a] hover:text-[#071b35]"
          >
            Tutustu historiaan
            <ArrowDown size={16} />
          </a>

          <a
            href="#shop"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d6b66a] px-7 py-3 text-sm uppercase tracking-[0.15em] text-[#071b35] transition hover:bg-[#f6f1e7]"
          >
            Tue 750v vanhojen tansseja
            <Heart size={16} />
          </a>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center pb-8">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#8f9dac]">
          Turku · Finland
        </p>
      </div>
    </section>
  );
}