// src/utils/schema.ts
// Single source of truth for structured data (schema.org) and site-wide constants.

export const SITE_URL = 'https://turtletrafo.com';
export const SITE_NAME = 'Turtle Transformation';
export const GA_MEASUREMENT_ID = 'G-21YC88FWVZ';

// Stable @id values so every page refers to the same entities (important for AI/answer engines).
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const MIRIAM_ID = `${SITE_URL}/about/#miriam-schmidberger`;
export const MARKUS_ID = `${SITE_URL}/about/#markus-schmidberger`;

// Public profiles that identify the entity (LinkedIn, etc.). Add verified URLs here.
export const SAME_AS: string[] = [
  'https://www.linkedin.com/company/turtletrafo',
  'https://www.instagram.com/turtletrafo/',
];

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: 'Turtle Transformation Limited',
    alternateName: ['Turtle Transformation', 'The Authentic Leader Academy'],
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/turtle-logo.png`,
    },
    image: `${SITE_URL}/og-image.png`,
    description:
      'Executive coaching and Data & AI advisory for senior leaders, founders and engineering organisations. Based in County Kerry, Ireland; working worldwide.',
    email: 'info@turtletrafo.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Drom Upper',
      addressLocality: 'Glenbeigh',
      addressRegion: 'Co. Kerry',
      postalCode: 'V93 F6X0',
      addressCountry: 'IE',
    },
    areaServed: 'Worldwide',
    knowsLanguage: ['en', 'de'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@turtletrafo.com',
      availableLanguage: ['English', 'German'],
    },
    founder: [{ '@id': MIRIAM_ID }, { '@id': MARKUS_ID }],
    ...(SAME_AS.length > 0 ? { sameAs: SAME_AS } : {}),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  };
}

export function personSchemas() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': MIRIAM_ID,
      name: 'Miriam Schmidberger',
      jobTitle: 'Change Angel & Executive Performance Coach',
      description:
        'Executive performance coach and Industry AI Advisor for Munster Technological University (MTU) Kerry. Certified AQai Adaptability Coach, Unbeatable Mind & Heroic Certified Coach, Yoga Alliance Master Teacher and Greator Festival 2024 keynote speaker.',
      image: `${SITE_URL}/images/miriam-schmidberger.jpg`,
      url: `${SITE_URL}/about/`,
      sameAs: ['https://www.linkedin.com/in/miriamschmidberger/'],
      worksFor: { '@id': ORG_ID },
      affiliation: {
        '@type': 'CollegeOrUniversity',
        name: 'Munster Technological University (MTU) Kerry',
      },
      knowsAbout: [
        'Leadership Development',
        'Adaptability AQ',
        'Emotional Regulation',
        'Somatic Coaching',
        'Organisational AI Adoption',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': MARKUS_ID,
      name: 'Dr. Markus Schmidberger',
      honorificPrefix: 'Dr.',
      jobTitle: 'Enterprise Data & AI Consultant / Co-Founder',
      description:
        'PhD in Bioinformatics and Technical Mathematics. Former Director of Data at Scout24 Group and Senior Consultant at AWS ProServe.',
      image: `${SITE_URL}/images/markus-schmidberger.jpg`,
      url: `${SITE_URL}/about/`,
      sameAs: ['https://www.linkedin.com/in/schmidberger/'],
      worksFor: { '@id': ORG_ID },
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'Technical University of Munich' },
      knowsAbout: [
        'Enterprise AI Strategy',
        'Data Engineering',
        'Agile Team Scaling',
        'Scrum',
        'Distributed Cloud Architecture',
      ],
    },
  ];
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}
