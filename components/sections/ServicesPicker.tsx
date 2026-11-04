"use client";

import Image from "next/image";
import { useState } from "react";
import type { ServicesData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { buttonArrow, buttonLime } from "@/components/ui/button";
import { swipeItem, swipeRow } from "@/components/ui/swipe";

/**
 * Desktop: a numbered list of the services beside one large photo; pointing at (or tapping) a service shows its
 * photo and text. Below 1024px every service is its own photo card instead (one swipeable row on phones).
 */
export const ServicesPicker = ({ data }: { data: ServicesData }) => {
  const [active, setActive] = useState(0);
  const { services, cardButton } = data;
  const number = (index: number) => String(index + 1).padStart(2, "0");

  return (
    <>
      <div className="grid-cols-[0.95fr_1.05fr] gap-10 max-lg:hidden lg:grid">
        <ul className="flex flex-col justify-center">
          {services.map((service, index) => {
            const current = index === active;
            return (
              <li key={service.title}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-pressed={current}
                  className={`flex w-full items-center gap-5 border-b border-[var(--color-border)] px-4 py-4 text-left transition-colors duration-300 ${
                    current ? "rounded-xl border-transparent bg-[var(--color-bg-main)] shadow-[0_0.75rem_2rem_-1rem_var(--color-shadow-card)]" : ""
                  }`}
                >
                  <span className={`font-display text-sm font-semibold ${current ? "text-[var(--color-primary)]" : "text-[var(--color-text-placeholder)]"}`}>{number(index)}</span>
                  <span className={`flex-1 font-display text-[1.375rem] font-semibold tracking-[-0.01em] ${current ? "text-[var(--color-heading)]" : "text-[var(--color-text-muted)]"}`}>
                    {service.title}
                  </span>
                  <span
                    className={`grid size-9 place-items-center rounded-full transition-colors duration-300 ${
                      current ? "bg-[var(--color-primary)] text-[var(--color-white)]" : "bg-[var(--color-bg-chip)] text-[var(--color-primary)]"
                    }`}
                  >
                    <Icon name={service.icon} className="size-4" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="relative h-[30rem] overflow-hidden rounded-[1.75rem] bg-[var(--color-forest)]">
          {/* every photo stays stacked and cross-fades, so the frame is never empty while the next one loads */}
          {services.map((service, index) => (
            <Image
              key={service.title}
              quality={90}
              src={service.image}
              alt=""
              fill
              sizes="620px"
              className={`object-cover transition-opacity duration-500 ${index === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-[var(--color-forest-deep)] p-6" aria-live="polite">
            <p className="font-display text-sm font-semibold text-[var(--color-lime)]">{number(active)}</p>
            <h3 className="mt-1 font-display text-2xl font-semibold text-[var(--color-white)]">{services[active].title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-white-70)]">{services[active].text}</p>
            <a href={cardButton.href} className={`${buttonLime} mt-4 h-11 px-6`}>
              {cardButton.label}
              <Icon name="LuArrowRight" className={buttonArrow} />
            </a>
          </div>
        </div>
      </div>

      <ul className={`grid gap-4 sm:grid-cols-2 lg:hidden ${swipeRow}`}>
        {services.map((service, index) => (
          <li key={service.title} className={`flex ${swipeItem}`}>
            <a href={cardButton.href} aria-label={`${cardButton.label}: ${service.title}`} className="group flex w-full flex-col overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-bg-main)]">
              <span className="relative block h-44 overflow-hidden">
                <Image quality={90} src={service.image} alt="" fill sizes="(min-width: 640px) 46vw, 76vw" className="object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-[var(--color-lime)] px-2.5 py-0.5 font-display text-xs font-semibold text-[var(--color-forest-deep)]">{number(index)}</span>
              </span>
              <span className="flex flex-1 flex-col p-5">
                <span className="font-display text-lg font-semibold text-[var(--color-heading)]">{service.title}</span>
                <span className="mt-1 flex-1 text-sm leading-relaxed text-[var(--color-text-muted)]">{service.text}</span>
                <span className="mt-3 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-[var(--color-primary)]">
                  {cardButton.label}
                  <Icon name="LuArrowRight" className={buttonArrow} />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
