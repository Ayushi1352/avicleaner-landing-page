import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import rawData from "@/data/templates.json";
import type { CleaningTemplateData } from "@/types/templates.types";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700"], fallback: ["Arial", "sans-serif"], variable: "--font-outfit" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], fallback: ["Arial", "sans-serif"], variable: "--font-dm-sans" });

const templateData: CleaningTemplateData = rawData;
const sectionData = templateData.categories.Cleaning.sections;
const commonData = templateData.common;
const headerData = sectionData.Header?.variants?.CleaningHeader1;

const fontVariables = {
  "--font-primary": commonData.theme.fonts.primary,
  "--font-heading": commonData.theme.fonts.heading,
} as CSSProperties;

export const metadata: Metadata = {
  title: commonData.metadata.title,
  description: commonData.metadata.description,
  icons: {
    icon: commonData.metadata.icon,
    shortcut: commonData.metadata.icon,
    apple: commonData.metadata.icon,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={commonData.metadata.lang}
      style={fontVariables}
      data-scroll-behavior="smooth"
      // Root font size: 16px, and from 1024px up it follows the 1440px design (1rem = 1/90 of the screen, at most 16px),
      // so 1024px shows exactly the 1440px layout, only smaller. Every size on the page is in rem, so it all scales together.
      // Header and footer links scroll smoothly to their section on this one page.
      // Everything clickable gets the pointer; with reduced motion turned on nothing animates.
      className={`${outfit.variable} ${dmSans.variable} h-full scroll-smooth antialiased [-webkit-tap-highlight-color:transparent] [font-size:16px] lg:[font-size:min(16px,calc(100vw/90))] [&_:where(a[href],button:not(:disabled),select,[role=button],summary)]:cursor-pointer motion-reduce:scroll-auto motion-reduce:[&_*]:!duration-[0.01ms]`}
    >
      <body className="min-h-full">
        <ScrollReveal />
        {/*
          The whole site sits in one frame, at most 1920px wide and centred. Up to 1920px it fills the screen, so
          nothing changes; on wider screens or when the browser is zoomed out the page stays in the middle with
          equal space on both sides instead of stretching.
          --section-gap is the one space above and below every section: 2.5rem on phones and 3.5rem from tablets up
          (56px at 1440px; on desktop it scales with the page, see the font size above), so each section fits on one screen.
        */}
        <div className="mx-auto min-h-screen w-full max-w-[1920px] overflow-x-clip bg-[var(--color-bg-main)] [--section-gap:2.5rem] sm:[--section-gap:3.5rem]">
          <Header data={headerData} company={commonData.company} />
          {children}
          <Footer data={commonData.Footer} company={commonData.company} links={headerData?.navLinks} />
        </div>
      </body>
    </html>
  );
}
