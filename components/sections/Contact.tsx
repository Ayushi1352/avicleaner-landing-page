import type { CompanyData, ContactData, EnquiryFormData } from "@/types/templates.types";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ContactProps = {
  data?: ContactData;
  form?: EnquiryFormData;
  company: CompanyData;
};

/** Contact details on the left, the contact form in a white card on the right (the website's Contact Us page) */
export const Contact = ({ data: contact, form, company }: ContactProps) => {
  if (!contact) return null;

  return (
    <section className="bg-[var(--color-bg-main)] py-[var(--section-gap)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        <div className="flex min-w-0 flex-col">
          <SectionHeading label={contact.label} title={contact.title} description={contact.description} />

          {/* from tablet up the three cards share the height left beside the form, so both columns start and end level */}
          <ul data-reveal className="mt-6 grid gap-3 md:flex-1 md:auto-rows-fr md:gap-4 lg:mt-8">
            {company.contactInfo.map((item) => {
              const external = item.href.startsWith("http");
              return (
                <li key={item.title}>
                  <a href={item.href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group flex h-full items-center gap-4 rounded-2xl bg-[var(--color-bg-alt)] p-4 ring-1 ring-[var(--color-border)] transition-colors hover:ring-[var(--color-primary)] lg:gap-5 lg:px-6">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[var(--color-bg-chip)] text-[var(--color-primary)] transition-colors group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-white)] lg:size-14">
                      <Icon name={item.icon} className="size-5 lg:size-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium text-[var(--color-text-muted)] lg:text-sm">{item.title}</span>
                      <span className="mt-0.5 block break-words font-display font-medium text-[var(--color-heading)] lg:text-lg">{item.lines.join(" ")}</span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* from tablet up the notes box takes up any spare height, so both sides end level */}
        <div data-reveal className="flex min-w-0 flex-col rounded-[1.75rem] bg-[var(--color-bg-main)] p-5 shadow-[0_1.5rem_3rem_-1.5rem_var(--color-shadow-menu)] ring-1 ring-[var(--color-border)] sm:p-8">
          <h3 className="font-display text-2xl font-semibold tracking-[-0.01em] text-[var(--color-heading)]">{contact.form.title}</h3>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">{contact.form.description}</p>
          <EnquiryForm data={form} />
        </div>
      </div>
    </section>
  );
};
