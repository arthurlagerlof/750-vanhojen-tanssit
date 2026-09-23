"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, Heart } from "lucide-react";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const [imageScale, setImageScale] = useState(1);

  const hasSnappedRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const disableSnapRef = useRef(false);

  const handleCtaClick = () => {
    // The user intentionally clicked a navigation link.
    // Don't let the automatic hero snap interfere with it.
    disableSnapRef.current = true;

    window.setTimeout(() => {
      disableSnapRef.current = false;
    }, 1200);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;

      tickingRef.current = true;

      window.requestAnimationFrame(() => {
        const hero = heroRef.current;

        if (!hero) {
          tickingRef.current = false;
          return;
        }

        const scrollY = window.scrollY;
        const heroHeight = hero.offsetHeight;

        // How far we've travelled through the hero.
        const progress = Math.min(
          Math.max(scrollY / (heroHeight * 0.65), 0),
          1,
        );

        // Strong cinematic zoom.
        const scale = 1 + progress * 0.2;

        setImageScale(scale);

        const scrollingDown = scrollY > lastScrollYRef.current;

        // Automatic snap point.
        const snapPoint = heroHeight * 0.12;

        if (
          !disableSnapRef.current &&
          scrollingDown &&
          scrollY >= snapPoint &&
          !hasSnappedRef.current
        ) {
          hasSnappedRef.current = true;

          const history = document.getElementById("historia");

          if (history) {
            history.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }

        // Allow snapping again after returning close to the top.
        if (scrollY < heroHeight * 0.1) {
          hasSnappedRef.current = false;
        }

        lastScrollYRef.current = scrollY;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#071b35] text-[#f6f1e7]"
    >
      {/* Hero image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 origin-center bg-cover bg-center md:bg-[center_35%]"
        style={{
          backgroundImage:
            "url('/history/2026_dance_lift_dirty_dancing.png')",
          transform: `scale(${imageScale})`,
          willChange: "transform",
        }}
      />

      {/* Dark blue overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#071b35]/45"
      />

      {/* Bottom gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#071b35]/20 via-transparent to-[#071b35]/75"
      />

      {/* Content */}
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
          Suomen historian keskellä.
          <br />
          Tutustu Katedralskolanin tarinaan ja tue
          koulumme 750v vanhojen tansseja.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="#historia"
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center gap-3 rounded-full border border-[#d6b66a] px-7 py-3 text-sm uppercase tracking-[0.18em] text-[#f6f1e7] transition hover:bg-[#d6b66a] hover:text-[#071b35]"
          >
            Tutustu historiaan
            <ArrowDown size={16} />
          </a>

          <a
            href="#shop"
            onClick={handleCtaClick}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d6b66a] px-7 py-3 text-sm uppercase tracking-[0.15em] text-[#071b35] transition hover:bg-[#f6f1e7]"
          >
            Tue 750v vanhojen tansseja
            <Heart size={16} />
          </a>
        </div>
      </div>

      {/* Location */}
      <div className="relative z-10 flex items-center justify-center pb-8">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#8f9dac]">
          Turku · Finland
        </p>
      </div>
    </section>
  );
}