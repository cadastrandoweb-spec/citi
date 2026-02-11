import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { PostCard } from "@/components/blog/PostCard";
import { Pagination } from "@/components/blog/Pagination";
import { BLOG_CATEGORIES } from "@/lib/blogTaxonomy";
import { getPostsByCategory } from "@/lib/posts";
import { paginate } from "@/lib/pagination";
import { absoluteUrl } from "@/lib/site";
import { breadcrumbSchema, jsonLdString } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = BLOG_CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return {};

  return {
    title: cat.name,
    description: cat.seoDescription,
    alternates: {
      canonical: absoluteUrl(`/categoria/${cat.slug}`),
    },
    openGraph: {
      title: cat.seoTitle,
      description: cat.seoDescription,
      url: absoluteUrl(`/categoria/${cat.slug}`),
    },
  };
}

export default async function CategoriaPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = Number(sp.page ?? "1") || 1;

  const cat = BLOG_CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const posts = getPostsByCategory(cat.name);
  const { items, totalPages } = paginate(posts, page, 10);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Categoria", href: "/" },
    { name: cat.name, href: `/categoria/${cat.slug}` },
  ];

  const schema = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: cat.name, href: `/categoria/${cat.slug}` },
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
              {cat.name}
            </h1>
            <p className="mt-2 text-sm text-[color:var(--text-muted)]">
              {cat.seoDescription}
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

        <Pagination basePath={`/categoria/${cat.slug}`} page={page} totalPages={totalPages} />
      </div>
    </Container>
  );
}
