import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { PostCard } from "@/components/blog/PostCard";
import { Pagination } from "@/components/blog/Pagination";
import { getPostsByTag } from "@/lib/posts";
import { paginate } from "@/lib/pagination";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbSchema, jsonLdString } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);

  return {
    title: `Tag: ${decoded}`,
    description: `Artigos relacionados à tag ${decoded} no Blog da Citi Imóveis.`,
    alternates: {
      canonical: absoluteUrl(`/tag/${encodeURIComponent(decoded.toLowerCase())}`),
    },
    openGraph: {
      title: `Tag: ${decoded} | Blog Citi Imóveis`,
      description: `Artigos relacionados à tag ${decoded}.`,
      url: absoluteUrl(`/tag/${encodeURIComponent(decoded.toLowerCase())}`),
    },
  };
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<{ tag: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { tag } = await params;
  const sp = await searchParams;
  const page = Number(sp.page ?? "1") || 1;

  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);
  const { items, totalPages } = paginate(posts, page, 10);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Tag", href: "/" },
    { name: decoded, href: `/tag/${encodeURIComponent(decoded.toLowerCase())}` },
  ];

  const schema = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: `Tag: ${decoded}`, href: `/tag/${encodeURIComponent(decoded.toLowerCase())}` },
  ]);

  return (
    <Container>
      <div className="py-10">
        <Breadcrumbs items={crumbs} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }}
        />

        <div className="mt-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--brand-900)]">
              Tag: {decoded}
            </h1>
            <p className="mt-2 text-sm text-[color:var(--text-muted)]">
              Artigos relacionados.
            </p>
          </div>
          <Link className="text-sm font-semibold text-[color:var(--brand-700)]" href="/buscar">
            Buscar no blog
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {items.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>

        <Pagination basePath={`/tag/${encodeURIComponent(decoded.toLowerCase())}`} page={page} totalPages={totalPages} />
      </div>
    </Container>
  );
}
