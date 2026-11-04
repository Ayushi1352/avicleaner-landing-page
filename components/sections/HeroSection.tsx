import Image from "next/image";
import type { HeroData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { HeadingText, SectionLabel } from "@/components/ui/SectionHeading";
import { buttonArrow, buttonLime } from "@/components/ui/button";

/**
 * Dark forest banner: heading, a short line and one button on the left; the cleaner photo in a tall rounded
 * frame on the right with a card of happy clients over its corner. On phones and tablets the photo sits under the text.
 */
export const HeroSection = ({ data: hero }: { data?: HeroData }) => {
  if (!hero) return null;
  const { clients } = hero;

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-forest)] pt-[4.5rem]">
      {/* soft lime glow behind the heading */}
      <div aria-hidden="true" className="absolute -left-40 -top-40 -z-10 size-[36rem] rounded-full bg-[var(--color-primary)] opacity-40 blur-[8rem]" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:min-h-[42rem] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:px-8 lg:py-14">
        <div className="transition-[opacity,transform] duration-700 ease-out [@starting-style]:translate-y-5 [@starting-style]:opacity-0">
          <SectionLabel text={hero.label} light />
          <h1 className="mt-5 font-display text-[2.5rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--color-white)] sm:text-[3.5rem] lg:text-[3.875rem]">
            <HeadingText parts={hero.title} light />
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-[var(--color-white-70)] sm:text-[1.0625rem]">{hero.description}</p>
          <a href={hero.button.href} className={`${buttonLime} mt-8 h-[3.25rem] px-7`}>
            {hero.button.label}
            <Icon name="LuArrowRight" className={buttonArrow} />
          </a>
        </div>

        <div className="relative transition-[opacity,transform] delay-150 duration-700 ease-out [@starting-style]:translate-y-5 [@starting-style]:opacity-0">
          <div className="relative h-72 overflow-hidden rounded-[1.75rem] sm:h-[26rem] lg:h-[34rem]">
            <Image src={hero.image.src} alt={hero.image.alt} fill preload quality={90} sizes="(min-width: 1024px) 600px, 92vw" className="object-cover object-[72%_center]" />
          </div>

          {/* happy clients card over the bottom-left corner */}
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-[var(--color-bg-main)] px-4 py-3 shadow-[0_1.25rem_2.5rem_-1rem_var(--color-shadow-menu)] sm:left-6 lg:-left-8 lg:bottom-10">
            <span className="flex -space-x-2.5">
              {clients.images.map((src) => (
                <span key={src} className="relative size-9 overflow-hidden rounded-full border-2 border-[var(--color-bg-main)]">
                  <Image src={src} alt="" fill sizes="36px" className="object-cover" />
                </span>
              ))}
            </span>
            <span>
              <span className="flex gap-0.5 text-[var(--color-primary)]" role="img" aria-label={clients.ratingLabel}>
                {Array.from({ length: 5 }, (_, n) => (
                  <Icon key={n} name="FaStar" className="size-3" />
                ))}
              </span>
              <span className="mt-0.5 block font-display text-sm font-semibold text-[var(--color-heading)]">
                {clients.value} {clients.label}
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
