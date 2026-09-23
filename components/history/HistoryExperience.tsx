"use client";

import { useState } from "react";
import Image from "next/image";
import { historyEvents } from "@/data/history";

export function HistoryExperience() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = historyEvents[selectedIndex];
  const selectedImage = selected.image;
  const hasImage = Boolean(selectedImage?.trim());

  return (
    <section
      id="historia"
      className="bg-[#071b35] px-6 py-24 text-[#f6f1e7] md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section intro */}
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#d6b66a]">
            Koulun historia
          </p>

          <h2 className="mt-4 font-display text-4xl leading-tight md:text-6xl">
            750 vuotta historiaa
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#b7c0ca] md:text-lg">
            Katedralskolanin historia ulottuu keskiajalle. Valitse
            aikajanalta hetki ja tutustu koulun pitkään matkaan.
          </p>
        </div>

        {/* Timeline */}
        <div className="history-timeline mt-16 overflow-x-auto pb-4">
          <div className="relative min-w-max px-2 md:px-0">
            {/* Continuous timeline line */}
            <div
              aria-hidden="true"
              className="absolute left-2 right-2 top-[8px] h-px bg-white/15 md:left-0 md:right-0"
            />

            <div className="relative flex items-start justify-between gap-10 md:gap-8">
              {historyEvents.map((event, index) => {
                const active = index === selectedIndex;

                return (
                  <button
                    key={`${event.year}-${index}`}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className="group relative w-28 shrink-0 text-left"
                  >
                    {/* Timeline point */}
                    <div className="relative z-10 flex h-4 items-center">
                      <span
                        className={`h-4 w-4 rounded-full border-2 transition ${
                          active
                            ? "border-[#f6f1e7] bg-[#d6b66a]"
                            : "border-[#718096] bg-[#071b35] group-hover:border-[#d6b66a]"
                        }`}
                      />
                    </div>

                    {/* Year */}
                    <p
                      className={`mt-3 font-display text-xl transition ${
                        active
                          ? "text-[#f6f1e7]"
                          : "text-[#8290a0] group-hover:text-[#d6b66a]"
                      }`}
                    >
                      {event.year}
                    </p>

                    {/* Event title */}
                    <p
                      className={`mt-1 text-xs transition ${
                        active
                          ? "text-[#d6b66a]"
                          : "text-[#718096]"
                      }`}
                    >
                      {event.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected event */}
        <article className="mt-8 grid overflow-hidden rounded-3xl border border-white/10 bg-[#0d294b] lg:grid-cols-[1.1fr_0.9fr]">
          {/* Image / no-image panel */}
          <div className="relative min-h-[320px] lg:min-h-[520px]">
            {hasImage ? (
              <>
                <Image
                  src={selected.image!}
                  alt={selected.imageAlt ?? selected.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                  priority={selectedIndex === 0}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071b35]/70 via-transparent to-transparent" />
              </>
            ) : (
              <div className="flex h-full min-h-[320px] items-center justify-center bg-[#102f50] p-10 text-center lg:min-h-[520px]">
                <div>
                  <p className="font-display text-7xl text-[#d6b66a] md:text-8xl">
                    {selected.year}
                  </p>

                  <div className="mx-auto mt-6 h-px w-16 bg-[#d6b66a]/50" />

                  <p className="mt-6 text-xs uppercase tracking-[0.3em] text-[#8290a0]">
                    Katedralskolanin historia
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Event information */}
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
            <p className="font-display text-5xl text-[#d6b66a] md:text-6xl">
              {selected.year}
            </p>

            <h3 className="mt-4 font-display text-3xl md:text-4xl">
              {selected.title}
            </h3>

            <p className="mt-6 text-base leading-8 text-[#b7c0ca]">
              {selected.text}
            </p>

            {/* Image credit */}
            {selected.imageCredit && (
              <div className="mt-8 border-t border-white/10 pt-4 text-xs leading-5 text-[#718096]">
                {selected.imageCredit.creator && (
                  <span>{selected.imageCredit.creator}</span>
                )}

                {selected.imageCredit.title && (
                  <>
                    {selected.imageCredit.creator && " · "}
                    <span>{selected.imageCredit.title}</span>
                  </>
                )}

                <span>
                  {(selected.imageCredit.creator ||
                    selected.imageCredit.title) &&
                    " · "}
                  {selected.imageCredit.rights}
                </span>

                {selected.imageCredit.sourceUrl ? (
                  <>
                    {" · "}
                    <a
                      href={selected.imageCredit.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-2 transition hover:text-[#d6b66a]"
                    >
                      {selected.imageCredit.source}
                    </a>
                  </>
                ) : (
                  <>
                    {" · "}
                    {selected.imageCredit.source}
                  </>
                )}
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}