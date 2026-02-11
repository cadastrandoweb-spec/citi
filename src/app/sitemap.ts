import type { MetadataRoute } from "next";
import { BLOG_CATEGORIES } from "@/lib/blogTaxonomy";
import { SITE } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const base: MetadataRoute.Sitemap = [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE.url}/buscar`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const categories = BLOG_CATEGORIES.map((c) => ({
    url: `${SITE.url}/categoria/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const tags = Array.from(
    new Set(posts.flatMap((p) => p.frontmatter.tags ?? []).map((t) => t.toLowerCase())),
  ).map((t) => ({
    url: `${SITE.url}/tag/${encodeURIComponent(t)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const postEntries = posts.map((p) => ({
    url: `${SITE.url}/${p.slug}`,
    lastModified: new Date(p.frontmatter.updatedAt ?? p.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...base, ...categories, ...tags, ...postEntries];
}
