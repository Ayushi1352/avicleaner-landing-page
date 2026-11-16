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
  icon: string;
  lang: string;
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export interface ContactItem {
  id: string;
  icon: string;
  title: string;
  lines: string[];
  url: string;
}

export interface CompanyData {
  name: string;
  logo: string;
  logoLight: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  contactItems: ContactItem[];
}

export interface SocialLink {
  id: string;
  icon: string;
  label: string;
  url: string;
}

export interface FooterData {
  description: string;
  quickLinksTitle: string;
  contactTitle: string;
  socialLinks: SocialLink[];
  copyrightText: string;
  /** the words in the pill at the foot of the page */
  motto: string[];
}

export interface HeaderData {
  logoUrl: string;
  homeLabel: string;
  navLinks: LinkItem[];
  buttonText: string;
  buttonUrl: string;
  mainNavLabel: string;
  mobileNavLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
}

/** A title with its highlighted words (titleAccent) in the brand colour; the plain words before and after are optional */
export interface SplitTitle {
  titleTop?: string;
  titleAccent: string;
  titleBottom?: string;
}

/** A short numbered point, e.g. "Eco-Friendly — Safe for You & the Planet" */
export interface TextPoint {
  id: string;
  title: string;
  text: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface HeroData extends SplitTitle {
  id: string;
  label: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  image: string;
  imageAlt: string;
  clients: {
    value: string;
    label: string;
    stars: number;
    ratingLabel: string;
    images: string[];
  };
}

export interface AboutData extends SplitTitle {
  id: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
  secondImage: string;
  secondImageAlt: string;
  badge: StatItem;
  features: TextPoint[];
}

export interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  text: string;
  image: string;
}

export interface ServicesData extends SplitTitle {
  id: string;
  label: string;
  description: string;
  cardButtonText: string;
  cardButtonUrl: string;
  services: ServiceCard[];
}

export interface ProjectCard {
  id: string;
  tag: string;
  title: string;
  text: string;
  image: string;
}

export interface GalleryData extends SplitTitle {
  id: string;
  label: string;
  description: string;
  stat: StatItem;
  previousLabel: string;
  nextLabel: string;
  projects: ProjectCard[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  image: string;
}

export interface TestimonialsData extends SplitTitle {
  id: string;
  label: string;
  description: string;
  stars: number;
  ratingLabel: string;
  previousLabel: string;
  nextLabel: string;
  items: TestimonialItem[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqData extends SplitTitle {
  id: string;
  label: string;
  description: string;
  items: FaqItem[];
}

export interface ContactData extends SplitTitle {
  id: string;
  label: string;
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

interface Variants<T> {
  variants: Record<string, T>;
}

export interface TemplateComponent {
  key: string;
  component: string;
}

export interface CleaningTemplateData {
  common: {
    theme: ThemeData;
    metadata: SiteMetadataData;
    company: CompanyData;
    Footer: FooterData;
  };
  categories: {
    Cleaning: {
      sections: {
        Header?: Variants<HeaderData>;
        Hero?: Variants<HeroData>;
        About?: Variants<AboutData>;
        Services?: Variants<ServicesData>;
        Gallery?: Variants<GalleryData>;
        Testimonials?: Variants<TestimonialsData>;
        Faq?: Variants<FaqData>;
        Contact?: Variants<ContactData>;
        EnquiryForm?: Variants<EnquiryFormData>;
      };
      templateComponents: {
        [template: string]: {
          shared: Record<string, string>;
          pages: Record<string, { components: TemplateComponent[] }>;
        };
      };
    };
  };
}
