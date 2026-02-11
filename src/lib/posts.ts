import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  category: string;
  tags?: string[];
  keywords?: string[];
  author?: {
    name: string;
    title?: string;
    url?: string;
    image?: {
      url: string;
      alt?: string;
    };
  };
  image?: {
    url: string;
    alt?: string;
  };
  slug: string;
  featured?: boolean;
  readingTimeOverride?: number | null;
  faq?: { q: string; a: string }[];
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTimeText: string;
  readingMinutes: number;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "posts");

function listMdxFiles() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

export function getAllPosts(): Post[] {
  const files = listMdxFiles();
  const posts = files
    .map((filename) => {
      const fullPath = path.join(CONTENT_DIR, filename);
      const raw = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(raw);
      const fm = data as PostFrontmatter;
      const rt = readingTime(content);
      const minutes =
        typeof fm.readingTimeOverride === "number"
          ? fm.readingTimeOverride
          : Math.max(1, Math.round(rt.minutes));

      return {
        slug: fm.slug,
        frontmatter: fm,
        content,
        readingTimeText: `${minutes} min de leitura`,
        readingMinutes: minutes,
      } satisfies Post;
    })
    .filter((p) => !!p.slug && !!p.frontmatter?.title);

  posts.sort((a, b) =>
    new Date(b.frontmatter.date).getTime() -
    new Date(a.frontmatter.date).getTime(),
  );

  return posts;
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

export function getPostsByCategory(categoryName: string) {
  return getAllPosts().filter((p) => p.frontmatter.category === categoryName);
}

export function getPostsByTag(tag: string) {
  const t = tag.toLowerCase();
  return getAllPosts().filter((p) =>
    (p.frontmatter.tags ?? []).some((x) => x.toLowerCase() === t),
  );
}

export function getRelatedPosts(slug: string, limit = 4) {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const currentTags = new Set(
    (current.frontmatter.tags ?? []).map((t) => t.toLowerCase()),
  );

  const candidates = getAllPosts().filter((p) => p.slug !== slug);
  const scored = candidates
    .map((p) => {
      const tags = (p.frontmatter.tags ?? []).map((t) => t.toLowerCase());
      const overlap = tags.filter((t) => currentTags.has(t)).length;
      const sameCategory =
        p.frontmatter.category === current.frontmatter.category ? 2 : 0;
      return { post: p, score: overlap + sameCategory };
    })
    .sort((a, b) => b.score - a.score);

  return scored
    .filter((x) => x.score > 0)
    .slice(0, limit)
    .map((x) => x.post);
}
