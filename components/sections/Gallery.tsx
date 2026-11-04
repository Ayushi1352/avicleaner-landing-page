import type { GalleryData } from "@/types/templates.types";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GallerySlider } from "@/components/sections/GallerySlider";

/** Heading with the project count, then the recent projects as a sideways row of tall photo cards */
export const Gallery = ({ data }: { data?: GalleryData }) => {
  if (!data) return null;

  return (
    <section className="bg-[var(--color-forest)] py-[var(--section-gap)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
          <SectionHeading light label={data.label} title={data.title} description={data.description} />
          {/* project count in a see-through badge */}
          <p data-reveal className="flex items-center gap-4 self-start rounded-2xl bg-[var(--color-white-10)] px-5 py-4 md:self-end">
            <span className="font-display text-[2.25rem] font-semibold leading-none tracking-[-0.03em] text-[var(--color-lime)] lg:text-[2.75rem]">
              <CountUp value={data.stat.value} />
            </span>
            <span className="max-w-[10rem] text-sm leading-snug text-[var(--color-white-85)]">{data.stat.label}</span>
          </p>
        </div>

        <div data-reveal className="mt-6 lg:mt-10">
          <GallerySlider projects={data.projects} previousLabel={data.previousLabel} nextLabel={data.nextLabel} />
        </div>
      </div>
    </section>
  );
};
