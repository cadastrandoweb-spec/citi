import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SearchForm } from "@/components/blog/SearchForm";
import { PostCard } from "@/components/blog/PostCard";
import { Pagination } from "@/components/blog/Pagination";
import { getAllPosts } from "@/lib/posts";
import { buildSearchIndex } from "@/lib/search";
import { paginate } from "@/lib/pagination";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Buscar",
  description: "Busque artigos do Blog da Citi Imóveis por tema, categoria e termos relacionados.",
  alternates: { canonical: absoluteUrl("/buscar") },
  openGraph: {
    title: "Buscar | Blog Citi Imóveis",
    description: "Busque artigos do Blog da Citi Imóveis.",
    url: absoluteUrl("/buscar"),
    siteName: "Blog | Citi Imóveis",
  },
};

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const page = Number(sp.page ?? "1") || 1;

  const posts = getAllPosts();
  const index = buildSearchIndex(posts);
  const results = index.search(q);

  const mapped = results
    .map((r) => posts.find((p) => p.slug === r.slug))
    .filter(Boolean);

  const { items, totalPages } = paginate(mapped, page, 8);

  return (
    <Container>
      <div className="py-10">
        <h1 className="text-3xl font-semibold tracking-tight text-[color:var(--brand-900)]">
          Buscar
        </h1>
        <p className="mt-2 text-sm text-[color:var(--text-muted)]">
          Encontre conteúdos sobre compra, venda, financiamento e investimentos.
        </p>

        <div className="mt-6">
          <SearchForm />
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="text-sm text-black/60">
            {q ? (
              <span>
                Resultados para <span className="font-semibold text-black">{q}</span>
              </span>
            ) : (
              <span>Mostrando todos os artigos</span>
            )}
          </div>
          <a
            className="text-sm font-semibold text-[color:var(--brand-700)]"
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noreferrer"
          >
            Tirar dúvidas no WhatsApp
          </a>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {items.map((p) => (
            <PostCard key={p!.slug} post={p!} />
          ))}
        </div>

        <Pagination basePath="/buscar" page={page} totalPages={totalPages} query={q ? { q } : {}} />
      </div>
    </Container>
  );
}
