# Avicleaner Landing Page

One-page landing page for **Avicleaner** professional cleaning services, built with Next.js 16, React 19 and Tailwind CSS 3. Every piece of text, image and link lives in `data/templates.json`; the components only render it.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
  layout.tsx            fonts, metadata (title, description, favicon), header, footer, scroll reveal
  page.tsx              the sections in page order
  globals.css           theme colours (CSS variables)
components/
  common/               Header (fixed bar, dropdown card menu on phones and tablets), Footer
  sections/             Hero, About, Services (+ ServicesPicker), Gallery (+ GallerySlider),
                        Testimonials (+ TestimonialSlider), FAQ, Contact (+ EnquiryForm)
  ui/                   Icon, SectionHeading, ScrollReveal, CountUp, FormSuccess,
                        useDummySubmit, button, swipe
data/templates.json     all content (sections and their variants)
types/templates.types.ts
public/images/          Avicleaner photos, logos and favicon
```

Each section's `id` in `templates.json` matches a header link (`#about` → `id="about"`).

## Responsive

Designed for phones, tablets, 1024px and desktop. From 1024px up the root font size follows the 1440px design (`1rem = 100vw / 90`, at most 16px), so the desktop layout scales down evenly.

## Forms

The contact form uses a dummy submit (`useDummySubmit`): it shows a sending state and a thank-you message that hides itself, but nothing is sent anywhere yet.
