import type { TestimonialsData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";

/** Heading on the left, one featured review on the right (stacked on phones and tablets) */
export const TestimonialsSection = ({ data }: { data?: TestimonialsData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className="scroll-mt-[4.5rem] bg-[var(--color-bg-main)] py-[var(--section-gap)]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:px-8">
        <SectionHeading label={data.label} titleTop={data.titleTop} titleAccent={data.titleAccent} titleBottom={data.titleBottom} description={data.description} />
        <div data-reveal className="min-w-0">
          <TestimonialSlider data={data} />
        </div>
      </div>
    </section>
  );
};
