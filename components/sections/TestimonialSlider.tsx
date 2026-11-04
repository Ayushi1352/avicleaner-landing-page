"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { TestimonialItem, TestimonialsData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";

const AUTOPLAY_MS = 6000;

const Quote = ({ item, className }: { item: TestimonialItem; className: string }) => (
  <blockquote className={className}>
    <p className="font-display text-lg font-medium leading-relaxed text-[var(--color-white)] sm:text-[1.375rem] lg:text-[1.5rem]">“{item.quote}”</p>
    <footer className="mt-5">
      <span className="block font-display font-semibold text-[var(--color-lime)]">{item.name}</span>
      <span className="text-sm text-[var(--color-white-70)]">{item.role}</span>
    </footer>
  </blockquote>
);

/** One review at a time in a dark card; the client photos underneath pick a review. Moves on by itself and waits while hovered */
export const TestimonialSlider = ({ data }: { data: TestimonialsData }) => {
  const { items } = data;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (step: number) => setIndex((current) => (current + step + items.length) % items.length);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % items.length), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, items.length]);

  const arrow =
    "grid size-10 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-heading)] transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-white)]";

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative overflow-hidden rounded-[1.75rem] bg-[var(--color-forest)] p-6 sm:p-9">
        <Icon name="FaQuoteLeft" className="absolute right-6 top-6 size-14 text-[var(--color-white-10)] sm:size-20" />
        <p className="flex gap-1 text-[var(--color-lime)]" role="img" aria-label={data.ratingLabel}>
          {Array.from({ length: data.stars }, (_, n) => (
            <Icon key={n} name="FaStar" className="size-4" />
          ))}
        </p>
        <div className="mt-4 grid" aria-live="polite">
          {/* every quote takes up the same cell unseen, so the card keeps the height of the longest one and the controls never jump */}
          {items.map((item) => (
            <Quote key={item.name} item={item} className="invisible col-start-1 row-start-1" />
          ))}
          {/* keyed by slide, so each new quote fades in */}
          <Quote key={index} item={items[index]} className="col-start-1 row-start-1 transition-opacity duration-500 [@starting-style]:opacity-0" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="mr-auto flex gap-2">
          {items.map((item, n) => (
            <button
              key={item.name}
              type="button"
              aria-label={item.name}
              aria-current={n === index}
              onClick={() => setIndex(n)}
              className={`relative size-11 overflow-hidden rounded-full border-2 bg-[var(--color-bg-chip)] transition-[border-color,opacity] sm:size-12 ${
                n === index ? "border-[var(--color-primary)] opacity-100" : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <Image src={item.image} alt="" fill sizes="48px" className="object-cover" />
            </button>
          ))}
        </div>
        <button type="button" aria-label={data.previousLabel} onClick={() => go(-1)} className={`${arrow} max-sm:hidden`}>
          <Icon name="LuChevronLeft" className="size-5" />
        </button>
        <button type="button" aria-label={data.nextLabel} onClick={() => go(1)} className={`${arrow} max-sm:hidden`}>
          <Icon name="LuChevronRight" className="size-5" />
        </button>
      </div>
    </div>
  );
};
