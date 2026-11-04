import Image from "next/image";
import type { CompanyData, FooterData, LinkData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";

/** Fills `{year}` in the copyright line; cached so the footer can still be prerendered. */
const currentYear = async () => {
  "use cache";
  return new Date().getFullYear();
};

const columnTitle = "font-display text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-lime)]";

type FooterProps = {
  data?: FooterData;
  company: CompanyData;
  /** the header menu, shown again as the footer's quick links */
  links?: LinkData[];
};

/** Light logo and text beside the social links on top; quick links and contact details below; copyright and motto in a pill at the bottom */
export const Footer = async ({ data: footer, company, links = [] }: FooterProps) => {
  if (!footer) return null;
  const copyright = footer.copyright.replace("{year}", String(await currentYear()));

  return (
    <footer className="relative overflow-hidden bg-[var(--color-forest-deep)] text-[var(--color-white-70)]">
      {/* oversized brand word behind the footer */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.18em] left-1/2 -translate-x-1/2 select-none font-display text-[22vw] font-bold leading-none tracking-[-0.06em] text-[var(--color-white-5)] lg:text-[11rem]"
      >
        {footer.logo.alt}
      </span>

      <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-[var(--color-white-10)] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Image src={footer.logo.src} alt={footer.logo.alt} width={footer.logo.width} height={footer.logo.height} sizes="180px" className="h-auto w-40" />
            <p className="mt-4 max-w-md text-sm leading-relaxed">{footer.tagline}</p>
          </div>
          <div className="flex gap-3">
            {company.socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="grid size-11 place-items-center rounded-full bg-[var(--color-white-5)] text-[var(--color-white)] ring-1 ring-[var(--color-white-10)] transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-lime)] hover:text-[var(--color-forest-deep)]"
              >
                <Icon name={social.icon} className="size-[1.125rem]" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-8 py-8 lg:grid-cols-2 lg:gap-12">
          <nav aria-label={footer.menuTitle}>
            <h2 className={columnTitle}>{footer.menuTitle}</h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {links.map((link) => (
                <li key={link.href + link.label}>
                  <a href={link.href} className="text-[var(--color-white)] transition-colors hover:text-[var(--color-lime)]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={columnTitle}>{footer.contactTitle}</h2>
            <ul className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              {company.contactInfo.map((item) => {
                const external = item.href.startsWith("http");
                return (
                  <li key={item.title} className="flex min-w-0 items-start gap-3">
                    <Icon name={item.icon} className="mt-0.5 size-4 shrink-0 text-[var(--color-lime)]" />
                    <a
                      href={item.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="min-w-0 break-words transition-colors hover:text-[var(--color-white)] hover:underline hover:underline-offset-4"
                    >
                      {item.lines.join(" ")}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 rounded-2xl bg-[var(--color-white-5)] px-6 py-4 sm:rounded-full text-center text-xs ring-1 ring-[var(--color-white-10)] sm:flex-row sm:text-left">
          <p>{copyright}</p>
          <p className="font-display font-semibold uppercase tracking-[0.3em] text-[var(--color-white)]">
            {footer.motto.map((word, index) => (
              <span key={word}>
                {index > 0 && <span className="text-[var(--color-lime)]"> • </span>}
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
};
