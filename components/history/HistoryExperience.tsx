"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { historyEvents } from "@/data/history";

export function HistoryExperience() {
  const [activeIndex, setActiveIndex] = useState(
    historyEvents.length - 1,
  );

  const activeEvent = historyEvents[activeIndex];

  const timelineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const activeNode = nodeRefs.current[activeIndex];

    if (!activeNode || !timelineRef.current) return;

    activeNode.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  return (
    <section
      id="historia"
      className="relative min-h-screen overflow-hidden bg-[#071b35] text-[#f6f1e7]"
    >
      {/* Faint medieval-inspired background pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.055]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#d6b66a_1px,transparent_1px),radial-gradient(circle_at_80%_70%,#d6b66a_1px,transparent_1px)] bg-[size:48px_48px]" />

        <div className="absolute left-1/2 top-1/2 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d6b66a]" />

        <div className="absolute left-1/2 top-1/2 h-[55vw] w-[55vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d6b66a]" />
      </div>

      {/* Architectural side lines */}
      <div className="pointer-events-none absolute inset-y-0 left-6 hidden w-px bg-gradient-to-b from-transparent via-[#b99a5a]/30 to-transparent md:block" />

      <div className="pointer-events-none absolute inset-y-0 right-6 hidden w-px bg-gradient-to-b from-transparent via-[#b99a5a]/30 to-transparent md:block" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-20 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-16 flex items-end justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[#d6b66a]">
              Katedralskolan i Åbo
            </p>

            <h2 className="font-display mt-4 max-w-3xl text-5xl leading-none sm:text-7xl lg:text-8xl">
              Seitsemän ja puoli
              <br />
              vuosisataa.
            </h2>
          </div>

          <div className="hidden text-right md:block">
            <p className="font-display text-6xl text-[#d6b66a]">
              750
            </p>

            <p className="text-xs uppercase tracking-[0.25em] text-[#aeb8c4]">
              vuotta
            </p>
          </div>
        </div>

        {/* Main story */}
        <div className="grid flex-1 gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Image */}
          <div className="relative min-h-[420px] overflow-hidden border border-[#d6b66a]/30 bg-[#0c294c]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent.year}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-0"
              >
                <div className="flex h-full flex-col items-center justify-center bg-[#102f53] p-10 text-center">
                  <div className="mb-8 h-24 w-24 rounded-full border border-[#d6b66a]/50" />

                  <p className="text-xs uppercase tracking-[0.3em] text-[#d6b66a]">
                    Tuleva kuva
                  </p>

                  <p className="mt-4 max-w-sm font-display text-2xl text-[#f6f1e7]">
                    {activeEvent.imageLabel}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute left-5 top-5 border border-[#d6b66a]/50 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#d6b66a]">
              {activeEvent.year}
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent.year}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm uppercase tracking-[0.3em] text-[#d6b66a]">
                  {activeEvent.year}
                </p>

                <h3 className="font-display mt-3 text-5xl sm:text-6xl">
                  {activeEvent.title}
                </h3>

                <p className="mt-8 max-w-xl text-base leading-8 text-[#c7d0da] sm:text-lg">
                  {activeEvent.text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-16">

          {/* Extra vertical padding prevents the active node from being clipped */}
          <div
            ref={timelineRef}
            className="relative -mx-2 overflow-x-auto px-2 pb-4 pt-5 scrollbar-none"
          >
        {/* Timeline */}
		<div className="mt-16">
		  <div className="mb-4 flex items-center justify-between">
		    <p className="text-xs uppercase tracking-[0.3em] text-[#9daab8]">
		      Selaa historiaa
		    </p>
		  </div>

		  <div
		    ref={timelineRef}
		    className="relative -mx-2 overflow-x-auto px-2 pb-4 pt-5 scrollbar-none"
		  >
		    <div className="relative min-w-max">
		      {/* Full timeline line */}
		      <div className="pointer-events-none absolute left-0 right-0 top-[38px] h-px bg-[#d6b66a]/30" />

		      <div className="relative flex gap-1">
		        {historyEvents.map((event, index) => {
		          const active = index === activeIndex;

		          return (
		            <button
		              key={event.year}
		              ref={(element) => {
		                nodeRefs.current[index] = element;
		              }}
		              type="button"
		              onMouseEnter={() => setActiveIndex(index)}
		              onFocus={() => setActiveIndex(index)}
		              onClick={() => setActiveIndex(index)}
		              className="group flex min-w-[92px] flex-1 flex-col items-start rounded-md px-2 pb-2 text-left outline-none sm:min-w-[100px]"
		              aria-label={`Näytä vuosi ${event.year}`}
		            >
		              <div
		                className={`relative z-10 mb-4 h-7 w-7 rounded-full border transition-all duration-300 ${
		                  active
		                    ? "scale-110 border-[#071b35] bg-[#d6b66a] shadow-[0_0_0_4px_#d6b66a]"
		                    : "border-[#d6b66a]/60 bg-[#071b35] group-hover:border-[#f6f1e7] group-focus-visible:border-[#f6f1e7]"
		                }`}
		              />

		              <span
		                className={`whitespace-nowrap text-xs transition-colors ${
		                  active
		                    ? "text-[#f6f1e7]"
		                    : "text-[#8795a4] group-hover:text-[#d6b66a] group-focus-visible:text-[#d6b66a]"
		                }`}
		              >
		                {event.year}
		              </span>
		            </button>
		          );
		        })}
		      </div>
		    </div>
		  </div>
		</div>
          </div>

          {/* Mobile hint */}
          <p className="mt-1 text-center text-[10px] uppercase tracking-[0.25em] text-[#68788a] sm:hidden">
            Pyyhkäise sivulle
          </p>
        </div>

        {/* Continue */}
        <div className="mt-12 flex justify-center">
          <a
            href="#shop"
            className="flex flex-col items-center gap-3 text-[#aeb8c4] transition hover:text-[#d6b66a]"
          >
            <span className="text-[10px] uppercase tracking-[0.35em]">
              Ja tarina jatkuu
            </span>

            <ArrowDown size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
