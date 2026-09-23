"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/faq";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#f3ede1] px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-[#a58a55]">
            Usein kysyttyä
          </p>

          <h2 className="font-display mt-4 text-6xl leading-none text-[#241c18] sm:text-7xl">
            Kysymyksiä?
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#66574f]">
            Löydät täältä vastauksia yleisimpiin Kakkutukkua ja
            tilaamista koskeviin kysymyksiin.
          </p>
        </div>

        <div className="border-t border-[#d7c9b5]">
          {faqItems.map((item, index) => {
            const open = openIndex === index;

            return (
              <div
                key={item.question}
                className="border-b border-[#d7c9b5]"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(open ? null : index)
                  }
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={open}
                >
                  <span className="font-display text-2xl text-[#241c18] sm:text-3xl">
                    {item.question}
                  </span>

                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-[#a58a55] transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ${
                    open
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 pr-10 text-base leading-7 text-[#66574f]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
