"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProjectCard } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";

type GallerySliderProps = {
  projects: ProjectCard[];
  previousLabel: string;
  nextLabel: string;
};

/**
 * Tall photo cards in a row that scrolls sideways: one and a bit on phones and two and a bit on tablets (the next
 * card peeks in), exactly three on desktop. It can be swiped; the arrows move it one card at a time and fade out at either end.
 */
export const GallerySlider = ({ projects, previousLabel, nextLabel }: GallerySliderProps) => {
  const track = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setState({ start: el.scrollLeft < 4, end: el.scrollLeft > max - 4 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (step: number) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: step * (card.offsetWidth + gap) });
  };

  const arrow =
    "grid size-11 place-items-center rounded-full bg-[var(--color-bg-main)] text-[var(--color-forest)] shadow-[0_0.5rem_1.25rem_-0.75rem_var(--color-shadow-card)] transition-[background-color,color,opacity] duration-300 hover:bg-[var(--color-lime)] hover:text-[var(--color-forest-deep)] disabled:pointer-events-none disabled:opacity-40";

  return (
    <>
      <ul
        ref={track}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto scroll-smooth px-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:gap-5 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, index) => (
          <li key={project.title} className="group w-[80%] shrink-0 snap-start sm:w-[calc((100%-1rem)/2.15)] lg:w-[calc((100%-2.5rem)/3)]">
            <div className="relative h-72 overflow-hidden rounded-[1.75rem] bg-[var(--color-forest-deep)] sm:h-80 lg:h-[22rem]">
              <Image
                quality={90}
                src={project.image}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 80vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 grid size-10 place-items-center rounded-full bg-[var(--color-lime)] font-display text-sm font-semibold text-[var(--color-forest-deep)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="absolute right-4 top-4 rounded-full bg-[var(--color-bg-main)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-strong)]">{project.tag}</span>
            </div>
            <h3 className="mt-4 font-display text-xl font-semibold tracking-[-0.01em] text-[var(--color-white)]">{project.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-[var(--color-white-70)]">{project.text}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-end gap-3">
        <button type="button" aria-label={previousLabel} onClick={() => go(-1)} disabled={state.start} className={arrow}>
          <Icon name="LuChevronLeft" className="size-5" />
        </button>
        <button type="button" aria-label={nextLabel} onClick={() => go(1)} disabled={state.end} className={arrow}>
          <Icon name="LuChevronRight" className="size-5" />
        </button>
      </div>
    </>
  );
};
