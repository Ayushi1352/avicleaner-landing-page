import type { ServicesData } from "@/types/templates.types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesPicker } from "@/components/sections/ServicesPicker";

export const Services = ({ data }: { data?: ServicesData }) => {
  if (!data) return null;

  return (
    <section className="bg-[var(--color-bg-alt)] py-[var(--section-gap)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading label={data.label} title={data.title} description={data.description} />

        <div data-reveal className="mt-6 lg:mt-10">
          <ServicesPicker data={data} />
        </div>
      </div>
    </section>
  );
};
