import Link from "next/link";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-[color:var(--brand-700)]">
            {post.frontmatter.category}
          </div>
          <h3 className="mt-2 text-lg font-semibold leading-snug text-black">
            <Link className="hover:underline" href={`/${post.slug}`}>
              {post.frontmatter.title}
            </Link>
          </h3>
          <p className="mt-2 line-clamp-3 text-sm text-black/60">
            {post.frontmatter.description}
          </p>
        </div>
        <div className="shrink-0 text-xs text-black/50">
          {post.readingTimeText}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(post.frontmatter.tags ?? []).slice(0, 3).map((t) => (
          <Link
            key={t}
            href={`/tag/${encodeURIComponent(t.toLowerCase())}`}
            className="rounded-full bg-zinc-50 px-3 py-1 text-xs text-black/60 ring-1 ring-black/10 hover:bg-zinc-100"
          >
            {t}
          </Link>
        ))}
      </div>
    </article>
  );
}
