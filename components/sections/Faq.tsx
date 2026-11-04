import type { FaqData, FaqItem } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** One question as a native <details> (one open at a time via `name`), so the answers work and are findable without JavaScript */
const Question = ({ item, open }: { item: FaqItem; open: boolean }) => (
  <details name="faq" open={open} className="group rounded-2xl bg-[var(--color-bg-main)] transition-shadow open:shadow-[0_0.75rem_2rem_-1.25rem_var(--color-shadow-card)]">
    <summary className="flex list-none items-center justify-between gap-3 px-4 py-3.5 font-display text-[0.9375rem] font-semibold leading-snug text-[var(--color-heading)] sm:text-[1.0625rem] lg:px-5 lg:py-4 [&::-webkit-details-marker]:hidden">
      {item.question}
      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[var(--color-bg-chip)] text-[var(--color-primary)] transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-[var(--color-primary)] group-open:text-[var(--color-white)]">
        <Icon name="LuPlus" className="size-4" />
      </span>
    </summary>
    <p className="px-4 pb-4 pr-12 text-sm leading-relaxed text-[var(--color-text-muted)] lg:px-5 lg:pr-14">{item.answer}</p>
  </details>
);

/** The questions in one centred column, one under the other */
export const Faq = ({ data: faq }: { data?: FaqData }) => {
  if (!faq) return null;

  return (
    <section className="bg-[var(--color-bg-alt)] py-[var(--section-gap)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading align="center" label={faq.label} title={faq.title} description={faq.description} />

        <div data-reveal className="mx-auto mt-6 grid max-w-3xl gap-2.5 lg:mt-10 lg:gap-3">
          {faq.items.map((item, index) => (
            <Question key={item.question} item={item} open={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};
