"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { GlobalUIData, HeaderData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { buttonArrow, buttonGreen } from "@/components/ui/button";

/** id of the landing page section a link points to ("#about" → "about") */
const sectionId = (href: string) => href.replace(/^#/, "");

/** Keeps track of the section in the middle of the screen, so its link is shown as the current one */
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
};

type HeaderProps = {
  data?: HeaderData;
  ui: GlobalUIData;
};

export const Header = ({ data, ui }: HeaderProps) => {
  const links = data?.navigation ?? [];
  const [ids] = useState(() => links.map((link) => sectionId(link.href)));
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!data) return null;
  const { brand, cta } = data;
  // the "Contact Us" button already leads to the contact section, so its link is left out of both menus
  const menuLinks = links.filter((link) => link.href !== cta.href);

  /** The logo scrolls back to the top and drops any "#section" from the address bar, without reloading the page */
  const goHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    window.scrollTo({ top: 0 });
    if (window.location.hash) history.pushState(null, "", window.location.pathname + window.location.search);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 mx-auto max-w-[1920px] border-b border-[var(--color-border)] bg-[var(--color-bg-main)]">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" onClick={goHome} aria-label={ui.backToTop} className="shrink-0">
          <Image src={brand.logo.src} alt={brand.logo.alt} width={brand.logo.width} height={brand.logo.height} preload sizes="180px" className="h-auto w-[8.5rem] lg:w-[10rem]" />
        </Link>

        <nav aria-label={ui.mainNav} className="hidden items-center gap-8 lg:flex">
          {menuLinks.map((link) => {
            const current = sectionId(link.href) === active;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={current ? "location" : undefined}
                className={`relative whitespace-nowrap py-1 text-[0.9375rem] font-semibold transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-[var(--color-primary)] after:transition-transform after:duration-300 hover:text-[var(--color-primary)] ${
                  current ? "text-[var(--color-primary)] after:scale-x-100" : "text-[var(--color-heading)] after:scale-x-0"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a href={cta.href} className={`${buttonGreen} h-12 whitespace-nowrap px-6 max-sm:hidden`}>
            {cta.label}
            <Icon name="LuArrowRight" className={buttonArrow} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? ui.closeMenu : ui.openMenu}
            className="grid size-11 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-heading)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] lg:hidden"
          >
            <Icon name={open ? "LuX" : "LuMenu"} className="size-6" />
          </button>
        </div>
      </div>

      {/* dims the page under the open menu; tapping it closes the menu */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-x-0 bottom-0 top-[4.5rem] bg-[var(--color-menu-backdrop)] transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      />

      <nav
        id="mobile-menu"
        aria-label={ui.mobileNav}
        // when open it is a card only as tall as its links, and scrolls if they do not fit on the screen
        className={`absolute inset-x-4 top-full mt-2 grid max-h-[calc(100dvh-5.5rem)] overflow-hidden rounded-3xl bg-[var(--color-bg-main)] shadow-[0_1.25rem_3.125rem_-1.25rem_var(--color-shadow-menu)] transition-[grid-template-rows,opacity] duration-500 sm:inset-x-6 lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none invisible grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-y-auto">
          <ul className="flex flex-col px-5 py-4 sm:px-6">
            {menuLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between border-b border-[var(--color-border)] py-3.5 font-display font-semibold transition-colors hover:text-[var(--color-primary)] ${
                    sectionId(link.href) === active ? "text-[var(--color-primary)]" : "text-[var(--color-heading)]"
                  }`}
                >
                  {link.label}
                  <Icon name="LuChevronRight" className="size-4 text-[var(--color-primary)]" />
                </a>
              </li>
            ))}
            <li className="pt-5 sm:hidden">
              <a href={cta.href} onClick={() => setOpen(false)} className={`${buttonGreen} h-12 w-full px-7`}>
                {cta.label}
                <Icon name="LuArrowRight" className={buttonArrow} />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
