import rawData from "@/data/templates.json";
import type { CleaningTemplateData } from "@/types/templates.types";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutUs } from "@/components/sections/AboutUs";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

const templateData: CleaningTemplateData = rawData;
const sectionData = templateData.categories.Cleaning.sections;
const commonData = templateData.common;

/*
  One landing page with a section for each page of the Avicleaner website (no blog, no team, policy or Book Now
  page): every button leads to the Contact Us form in the contact section.
  The ids match the header and footer links in templates.json ("#about" → id="about"); scroll-mt keeps
  each section clear of the fixed header when a link scrolls to it.
*/
export default function Home() {
  return (
    <main>
      <div id="home">
        <HeroSection data={sectionData.Hero?.variants?.CleaningHero1} />
      </div>
      <div id="about" className="scroll-mt-[4.5rem]">
        <AboutUs data={sectionData.AboutUs?.variants?.CleaningAboutUs1} />
      </div>
      <div id="services" className="scroll-mt-[4.5rem]">
        <Services data={sectionData.Services?.variants?.CleaningServices1} />
      </div>
      <div id="gallery" className="scroll-mt-[4.5rem]">
        <Gallery data={sectionData.Gallery?.variants?.CleaningGallery1} />
      </div>
      <div id="testimonials" className="scroll-mt-[4.5rem]">
        <Testimonials data={sectionData.Testimonials?.variants?.CleaningTestimonials1} />
      </div>
      <div id="faq" className="scroll-mt-[4.5rem]">
        <Faq data={sectionData.Faq?.variants?.CleaningFaq1} />
      </div>
      <div id="contact" className="scroll-mt-[4.5rem]">
        <Contact
          data={sectionData.Contact?.variants?.CleaningContact1}
          form={sectionData.EnquiryForm?.variants?.CleaningEnquiryForm1}
          company={commonData.company}
        />
      </div>
    </main>
  );
}
