import { SITE, absoluteUrl } from "@/lib/site";

export function jsonLdString(obj: unknown) {
  return JSON.stringify(obj);
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function blogPostingSchema(params: {
  title: string;
  description: string;
  urlPath: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  image?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: params.title,
    description: params.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(params.urlPath),
    },
    datePublished: params.datePublished,
    dateModified: params.dateModified ?? params.datePublished,
    author: {
      "@type": "Organization",
      name: params.authorName,
      url: SITE.mainSiteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Citi Imóveis",
      url: SITE.mainSiteUrl,
    },
    image: params.image ? [params.image] : undefined,
    keywords: params.keywords?.length ? params.keywords.join(", ") : undefined,
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
