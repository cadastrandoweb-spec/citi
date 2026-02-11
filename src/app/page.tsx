import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SearchForm } from "@/components/blog/SearchForm";
import { PostCard } from "@/components/blog/PostCard";
import { BLOG_CATEGORIES } from "@/lib/blogTaxonomy";
import { getAllPosts } from "@/lib/posts";
import { SITE } from "@/lib/site";

export default function Home() {
  const posts = getAllPosts();
  const featured = posts.filter((p) => p.frontmatter.featured).slice(0, 3);
  const latest = posts.slice(0, 6);
  const mostRead = posts.slice(0, 4);

  return (
    <div>
      <section className="bg-[color:var(--surface-2)]">
        <Container>
          <div className="grid gap-10 py-12 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black ring-1 ring-black/10">
                Conteúdo imobiliário para decisões seguras
              </div>
              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-[color:var(--brand-900)] md:text-5xl">
                Blog da Citi Imóveis
              </h1>
              <p className="mt-4 text-base leading-7 text-[color:var(--text-muted)]">
                Guias, dicas e análises sobre compra, venda, investimento e financiamento
                imobiliário — com foco em clareza, segurança e conversão.
              </p>

              <div className="mt-6">
                <SearchForm />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-[color:var(--brand-600)] px-5 text-sm font-semibold text-white hover:bg-[color:var(--brand-700)]"
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Falar no WhatsApp
                </a>
                <a
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-black/10 bg-white px-5 text-sm font-semibold text-[color:var(--brand-900)] hover:bg-zinc-50"
                  href={`${SITE.mainSiteUrl}/busca`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver imóveis
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-[color:var(--brand-900)]">
                Categorias
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {BLOG_CATEGORIES.slice(0, 10).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/categoria/${c.slug}`}
                    className="rounded-2xl border border-black/10 bg-[color:var(--surface-2)] px-4 py-3 text-sm font-semibold text-black hover:bg-white"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--brand-900)]">
                Destaques
              </h2>
              <p className="mt-1 text-sm text-[color:var(--text-muted)]">
                Os guias mais importantes para quem está tomando decisão.
              </p>
            </div>
            <Link className="text-sm font-semibold text-[color:var(--brand-700)]" href="/buscar">
              Buscar artigos
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {(featured.length ? featured : latest.slice(0, 3)).map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[color:var(--surface-2)] py-12">
        <Container>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--brand-900)]">
                Últimos artigos
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {latest.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
            <aside className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-[color:var(--brand-900)]">
                Mais lidos
              </div>
              <div className="mt-4 grid gap-3">
                {mostRead.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="rounded-2xl border border-black/10 bg-[color:var(--surface-2)] px-4 py-3 hover:bg-white"
                  >
                    <div className="text-sm font-semibold text-black">{p.frontmatter.title}</div>
                    <div className="mt-1 text-xs text-black/50">{p.readingTimeText}</div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-[color:var(--brand-900)] p-5 text-white">
                <div className="text-sm font-semibold">Quer ajuda para encontrar o imóvel ideal?</div>
                <p className="mt-2 text-sm/6 text-white/80">
                  Fale agora com a equipe da Citi e receba uma curadoria de imóveis.
                </p>
                <a
                  className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-xl bg-white text-sm font-semibold text-[color:var(--brand-900)]"
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Chamar no WhatsApp
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
