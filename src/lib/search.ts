import Fuse from "fuse.js";
import type { Post } from "@/lib/posts";

export type SearchHit = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  score?: number;
};

export function buildSearchIndex(posts: Post[]) {
  const items: SearchHit[] = posts.map((p) => ({
    slug: p.slug,
    title: p.frontmatter.title,
    description: p.frontmatter.description,
    date: p.frontmatter.date,
    category: p.frontmatter.category,
    tags: p.frontmatter.tags ?? [],
  }));

  const fuse = new Fuse(items, {
    includeScore: true,
    threshold: 0.35,
    ignoreLocation: true,
    keys: [
      { name: "title", weight: 0.55 },
      { name: "description", weight: 0.25 },
      { name: "category", weight: 0.1 },
      { name: "tags", weight: 0.1 },
    ],
  });

  return {
    search(query: string) {
      if (!query?.trim()) return items;
      return fuse.search(query).map((r) => ({ ...r.item, score: r.score }));
    },
  };
}
