export interface ThemeFonts {
  primary: string;
  heading: string;
}

export interface ThemeData {
  fonts: ThemeFonts;
}

export interface SiteMetadataData {
  title: string;
  description: string;
  lang: string;
}

export interface GlobalUIData {
  mainNav: string;
  mobileNav: string;
  openMenu: string;
  closeMenu: string;
  backToTop: string;
}

export interface LinkData {
  label: string;
  href: string;
}

export interface ImageData {
  src: string;
  alt: string;
}

export interface SizedImageData extends ImageData {
  width: number;
  height: number;
}

/** A heading split into parts; highlighted parts show in the brand colour. */
export interface HeadingPart {
  text: string;
  highlight: boolean;
}

export interface ContactInfoItem {
  icon: string;
  title: string;
  lines: string[];
  href: string;
}

export interface SocialLink {
  id: string;
  icon: string;
  label: string;
  url: string;
}

export interface CompanyData {
  contactInfo: ContactInfoItem[];
  socialLinks: SocialLink[];
}

export interface FooterData {
  logo: SizedImageData;
  tagline: string;
  menuTitle: string;
  contactTitle: string;
  copyright: string;
  motto: string[];
}

export interface CommonData {
  theme: ThemeData;
  metadata: SiteMetadataData;
  globalUI: GlobalUIData;
  company: CompanyData;
  Footer?: FooterData;
}

export interface HeaderData {
  brand: {
    name: string;
    logo: SizedImageData;
  };
  navigation: LinkData[];
  cta: LinkData;
}

/** A short point with an icon, e.g. "Eco-Friendly Products" */
export interface IconPoint {
  icon: string;
  title: string;
  text: string;
}

export interface HeroData {
  label: string;
  title: HeadingPart[];
  description: string;
  button: LinkData;
  image: ImageData;
  clients: {
    value: string;
    label: string;
    ratingLabel: string;
    images: string[];
  };
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AboutUsData {
  label: string;
  title: HeadingPart[];
  description: string;
  image: ImageData;
  secondImage: ImageData;
  badge: StatItem;
  features: IconPoint[];
}

export interface ServiceCard {
  icon: string;
  title: string;
  text: string;
  image: string;
}

export interface ServicesData {
  label: string;
  title: HeadingPart[];
  description: string;
  cardButton: LinkData;
  services: ServiceCard[];
}

export interface ProjectCard {
  tag: string;
  title: string;
  text: string;
  image: string;
}

export interface GalleryData {
  label: string;
  title: HeadingPart[];
  description: string;
  stat: StatItem;
  previousLabel: string;
  nextLabel: string;
  projects: ProjectCard[];
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  image: string;
}

export interface TestimonialsData {
  label: string;
  title: HeadingPart[];
  description: string;
  stars: number;
  ratingLabel: string;
  previousLabel: string;
  nextLabel: string;
  items: TestimonialItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqData {
  label: string;
  title: HeadingPart[];
  description: string;
  items: FaqItem[];
}

export interface ContactData {
  label: string;
  title: HeadingPart[];
  description: string;
  form: {
    title: string;
    description: string;
  };
}

export interface EnquiryFormData {
  fields: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  };
  button: string;
  sending: string;
  successTitle: string;
  success: string;
  closeLabel: string;
}

type Section<Variant extends string, Data> = {
  variants?: { [Name in Variant]?: Data };
};

export interface CleaningSections {
  Header?: Section<"CleaningHeader1", HeaderData>;
  Hero?: Section<"CleaningHero1", HeroData>;
  AboutUs?: Section<"CleaningAboutUs1", AboutUsData>;
  Services?: Section<"CleaningServices1", ServicesData>;
  Gallery?: Section<"CleaningGallery1", GalleryData>;
  Testimonials?: Section<"CleaningTestimonials1", TestimonialsData>;
  Faq?: Section<"CleaningFaq1", FaqData>;
  Contact?: Section<"CleaningContact1", ContactData>;
  EnquiryForm?: Section<"CleaningEnquiryForm1", EnquiryFormData>;
}

export interface TemplateComponentEntry {
  key: string;
  component: string;
}

export interface TemplateComponents {
  shared: {
    Header: string;
    Footer: string;
  };
  pages: Record<string, { components: TemplateComponentEntry[] }>;
}

export interface CleaningCategory {
  sections: CleaningSections;
  templateComponents: TemplateComponents;
}

export interface CleaningTemplateData {
  common: CommonData;
  categories: {
    Cleaning: CleaningCategory;
  };
}
