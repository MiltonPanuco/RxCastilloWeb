import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "../lib/siteContent";

export function FAQSection({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-[#dbe2e9]">
      {faqs.map((faq, index) => {
        const expanded = open === index;
        return (
          <div key={faq._id} className="py-5">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(expanded ? -1 : index)}
                aria-expanded={expanded}
                className="flex w-full items-center justify-between gap-5 text-left text-base font-bold text-[#163a59] sm:text-lg"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[#1a446c] transition ${expanded ? "rotate-180" : ""}`}
                />
              </button>
            </h3>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-2 pt-4 text-sm leading-7 text-[#4a5568]">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
