/** Shared look of every button and button-like link: softly rounded corners, semibold text and an arrow */
const base =
  "group inline-flex items-center justify-center gap-2 rounded-[0.625rem] border-2 font-display text-[0.9375rem] font-semibold transition-colors duration-300";

/** Green button for light sections; turns forest green on hover */
export const buttonGreen = `${base} border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-white)] hover:border-[var(--color-forest)] hover:bg-[var(--color-forest)]`;

/** Lime button for dark sections; turns white on hover */
export const buttonLime = `${base} border-[var(--color-lime)] bg-[var(--color-lime)] text-[var(--color-forest-deep)] hover:border-[var(--color-white)] hover:bg-[var(--color-white)]`;

/** Arrow inside a button that nudges up-right on hover */
export const buttonArrow = "size-4 shrink-0 transition-transform duration-300 group-hover:-rotate-45";
