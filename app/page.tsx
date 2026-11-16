import rawData from "@/data/templates.json";
import type { CleaningTemplateData } from "@/types/templates.types";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";

const templateData: CleaningTemplateData = rawData;
const sectionData = templateData.categories.Cleaning.sections;
const commonData = templateData.common;

/*
  One landing page with a section for each page of the Avicleaner website (no blog, no team, policy or Book Now
  page): every button leads to the Contact Us form in the contact section.
  Each section's id (templates.json) matches the header and footer links ("#about" → id="about").
*/
export default function Home() {
  return (
    <main>
      <HeroSection data={sectionData.Hero?.variants?.CleaningHero1} />
      <AboutSection data={sectionData.About?.variants?.CleaningAbout1} />
      <ServicesSection data={sectionData.Services?.variants?.CleaningServices1} />
      <GallerySection data={sectionData.Gallery?.variants?.CleaningGallery1} />
      <TestimonialsSection data={sectionData.Testimonials?.variants?.CleaningTestimonials1} />
      <FaqSection data={sectionData.Faq?.variants?.CleaningFaq1} />
      <ContactSection
        data={sectionData.Contact?.variants?.CleaningContact1}
        form={sectionData.EnquiryForm?.variants?.CleaningEnquiryForm1}
        company={commonData.company}
      />
    </main>
  );
}
