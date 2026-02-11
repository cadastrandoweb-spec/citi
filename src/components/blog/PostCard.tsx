import Link from "next/link";
import type { Post } from "@/lib/posts";

type Variant = "default" | "hero";

export function PostCard({ post, variant = "default" }: { post: Post; variant?: Variant }) {
  const base =
    variant === "hero"
      ? "group overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[var(--shadow-soft)]"
      : "group rounded-2xl border border-[color:var(--border)] bg-white p-5 shadow-sm transition hover:shadow-md";

  return (
    <article className={base}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--surface-pill)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--brand-secondary)]">
            {post.frontmatter.category}
          </div>
          <h3
            className={`${
              variant === "hero"
                ? "mt-3 text-2xl font-semibold leading-tight text-[color:var(--brand-secondary)]"
                : "mt-2 text-lg font-semibold leading-snug text-[color:var(--brand-secondary)]"
            }`}
          >
            <Link className="hover:text-[color:var(--brand-primary)]" href={`/${post.slug}`}>
              {post.frontmatter.title}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-3 text-sm text-[color:var(--text-muted)]">
            {post.frontmatter.description}
          </p>
        </div>
        <div className="shrink-0 text-xs text-[color:var(--text-muted)]">{post.readingTimeText}</div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(post.frontmatter.tags ?? []).slice(0, 3).map((t) => (
          <Link
            key={t}
            href={`/tag/${encodeURIComponent(t.toLowerCase())}`}
            className="rounded-full bg-[color:var(--surface-pill)] px-3 py-1 text-xs text-[color:var(--brand-secondary)] ring-1 ring-[color:var(--border)] hover:ring-[color:var(--brand-primary)]"
          >
            {t}
          </Link>
        ))}
      </div>
    </article>
  );
}
