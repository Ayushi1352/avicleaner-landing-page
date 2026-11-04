import type { TestimonialsData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";

/** Heading on the left, one featured review on the right (stacked on phones and tablets) */
export const Testimonials = ({ data }: { data?: TestimonialsData }) => {
  if (!data) return null;

  return (
    <section className="bg-[var(--color-bg-main)] py-[var(--section-gap)]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16 lg:px-8">
        <SectionHeading label={data.label} title={data.title} description={data.description} />
        <div data-reveal className="min-w-0">
          <TestimonialSlider data={data} />
        </div>
      </div>
    </section>
  );
};
