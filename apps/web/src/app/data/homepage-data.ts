export interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
}
export const slides: Slide[] = [
  {
    id: 1,
    title: 'Quirao Group Of Companies',
    description:
      'A diversified group of companies driving innovation, sustainability, and long-term value.',
    image: '/images/home-page/hero-section/hero-section-background.png',
  },
  {
    id: 2,
    title: 'Innovating for the Future',
    description: 'Leveraging technology and expertise to create lasting impact.',
    image: '/images/home-page/hero-section/hero-section-background2.png',
  },
  {
    id: 3,
    title: 'Sustainable and Responsible',
    description: 'Driving sustainable growth and social responsibility.',
    image: '/images/home-page/hero-section/hero-section-background3.png',
  },
];

/* =========================================================
   BUSINESS SECTION
========================================================= */

/* ---------- Business Type ---------- */
export interface Business {
  id: number;
  name: string;
  logo: string;
  wordLogo: string;
  topImage: string;
  cardImage: string;
  description: string;
}

/* ---------- Business Data ---------- */
export const businesses: Business[] = [
  {
    id: 1,
    name: 'Buildmaster PH',
    logo: '/images/logo/buildmaster/buildmaster-logo.png',
    wordLogo: '/images/logo/buildmaster/buildmaster-logo-word.png',
    topImage: '/images/home-page/business-preview/buildmaster-business-preview.png',
    cardImage: '/images/home-page/business-preview/buildmaster-business-preview-card.jpg',
    description:
      'BuildMaster Wholesale is a trusted supplier of construction and hardware materials based in Iloilo City, Philippines. We provide high-quality building products and materials for residential, commercial, and industrial projects, backed by reliable delivery services and expert advice.',
  },
  {
    id: 2,
    name: 'Paluto Seafood',
    logo: '/images/logo/paluto/paluto-logo-red.png',
    wordLogo: '/images/logo/paluto/paluto-logo-word.png',
    topImage: '/images/home-page/business-preview/paluto-business-preview.jpg',
    cardImage: '/images/home-page/business-preview/paluto-business-preview-card.jpg',
    description:
      'Paluto Seafood Grill & Restaurant is owned and managed by Piggly Foods Corporation (PFC)...',
  },
  {
    id: 3,
    name: 'Sari-sari Manokan',
    logo: '/images/logo/manokan/sari-sari-manokan-logo.png',
    wordLogo: '/images/logo/manokan/sari-sari-manokan-logo-word.png',
    topImage: '/images/home-page/business-preview/sari-sari-manokan-business-preview.jpg',
    cardImage: '/images/home-page/business-preview/sari-sari-manokan-business-preview-card.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  },
  {
    id: 4,
    name: 'Brightline Trucking',
    logo: '/images/logo/brightline/brightline-logo.png',
    wordLogo: '/images/logo/brightline/brightline-logo.png',
    topImage: '/images/home-page/business-preview/brightline-business-preview.jpg',
    cardImage: '/images/home-page/business-preview/brightline-business-preview-card.jpg',
    description:
      'Brightline Trucking is a service company engaged in hauling general cargo, offices & warehouses.',
  },
  {
    id: 5,
    name: 'Watergate ',
    logo: '/images/logo/watergate/watergate-logo.png',
    wordLogo: '/images/logo/watergate/watergate-logo.png',
    topImage: '/images/home-page/business-preview/watergate-business-preview.jpg',
    cardImage: '/images/home-page/business-preview/watergate-business-preview-card.jpg',
    description:
      'Welcome to the official Watergate Purified Drinking Water page! Join our community as we provide safe and affordable bottled drinking water to Filipinos anytime, and anywhere.',
  },
];
/* =========================================================
   ACHIEVEMENTS SECTION
========================================================= */

export interface Achievement {
  id: number;
  title: string;
  image: string;
}

export const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Top Construction Supplier 2023',
    image: '/images/home-page/achievements/achievements1.png',
  },
  {
    id: 2,
    title: 'Excellence in Service Award',
    image: '/images/home-page/achievements/achievements2.png',
  },
  {
    id: 3,
    title: 'Fastest Growing Company',
    image: '/images/home-page/achievements/achievements3.png',
  },
];
/* =========================================================
   BLOG SECTION
========================================================= */

export interface Blog {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
}

export const blogs: Blog[] = [
  {
    id: 1,
    title: 'Buildmaster Podcast Officially Out',
    date: 'January 15, 2026',
    description:
      'Our company officially launches a new construction division to serve larger commercial projects nationwide.',
    image: '/images/home-page/blogs/blog1.jpg',
  },
  {
    id: 2,
    title: 'Awarded Excellence in Service',
    date: 'December 20, 2025',
    description:
      'Recognized for outstanding service quality and commitment to client satisfaction.',
    image: '/images/home-page/blogs/blog2.jpg',
  },
  {
    id: 3,
    title: 'Join Us as We Travel and Hire You',
    date: 'November 10, 2025',
    description:
      'We invested in state-of-the-art heavy equipment to improve efficiency and safety standards.',
    image: '/images/home-page/blogs/blog3.jpg',
  },
  {
    id: 4,
    title: 'Welcoming Fresh Grads to the Industry',
    date: 'October 5, 2025',
    description:
      'Supporting local communities through infrastructure assistance and educational initiatives.',
    image: '/images/home-page/blogs/blog4.jpg',
  },
];
/* =========================================================
   FAQ SECTION
========================================================= */

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 1,
    question: 'What services does your company provide?',
    answer:
      'We offer construction supply, heavy equipment rental, and infrastructure development services across multiple industries.',
  },
  {
    id: 2,
    question: 'How can I request a quotation?',
    answer:
      'You can contact us through our website contact form or directly reach out to our sales team via email or phone.',
  },
  {
    id: 3,
    question: 'Do you operate nationwide?',
    answer: 'Yes, we provide services nationwide and are continuously expanding our operations.',
  },
  {
    id: 4,
    question: 'How long has your company been operating?',
    answer:
      'Our company has been operating for over a decade, delivering quality and reliable services to our clients.',
  },
];
