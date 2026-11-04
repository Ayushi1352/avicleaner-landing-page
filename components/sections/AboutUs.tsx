import Image from "next/image";
import type { AboutUsData } from "@/types/templates.types";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Story and four numbered promises on the left; a small photo grid with the years of experience on the right */
export const AboutUs = ({ data: about }: { data?: AboutUsData }) => {
  if (!about) return null;

  return (
    <section className="bg-[var(--color-bg-main)] py-[var(--section-gap)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <SectionHeading label={about.label} title={about.title} description={about.description} />

          <ol data-reveal className="mt-6 grid gap-x-6 sm:grid-cols-2 lg:mt-8">
            {about.features.map((feature, index) => (
              <li key={feature.title} className="flex gap-4 border-t border-[var(--color-border)] py-4">
                <span className="font-display text-sm font-semibold text-[var(--color-primary)]">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-display text-lg font-semibold leading-tight text-[var(--color-heading)]">{feature.title}</span>
                  <span className="mt-0.5 block text-sm text-[var(--color-text-muted)]">{feature.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* tall photo on the left, a second photo and the experience tile stacked on the right */}
        <div data-reveal className="grid h-72 grid-cols-[1.15fr_1fr] grid-rows-2 gap-3 sm:h-[26rem] lg:h-[32rem] lg:gap-4">
          <div className="relative row-span-2 overflow-hidden rounded-[1.75rem]">
            <Image quality={90} src={about.image.src} alt={about.image.alt} fill sizes="(min-width: 1024px) 300px, 50vw" className="object-cover object-[60%_center]" />
          </div>
          <div className="relative overflow-hidden rounded-[1.75rem]">
            <Image quality={90} src={about.secondImage.src} alt={about.secondImage.alt} fill sizes="(min-width: 1024px) 260px, 45vw" className="object-cover" />
          </div>
          <p className="flex flex-col justify-end rounded-[1.75rem] bg-[var(--color-lime)] p-4 text-[var(--color-forest-deep)] sm:p-6">
            <span className="font-display text-[2.5rem] font-semibold leading-none tracking-[-0.03em] sm:text-[3.5rem]">
              <CountUp value={about.badge.value} />
            </span>
            <span className="mt-1 text-sm font-medium sm:text-[1rem]">{about.badge.label}</span>
          </p>
        </div>
      </div>
    </section>
  );
};
