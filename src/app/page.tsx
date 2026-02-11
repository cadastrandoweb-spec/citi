import Image from "next/image";
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
  const hero = featured[0] ?? posts[0];
  const highlighted = featured.length > 1 ? featured.slice(1, 3) : posts.slice(1, 3);

  return (
    <div className="bg-[color:var(--surface-muted)]">
      <section className="border-b border-[color:var(--border)] bg-white/90">
        <Container>
          <div className="grid gap-8 py-10 lg:grid-cols-[2fr_1fr]">
            <article className="overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-[color:var(--surface-card)] shadow-[var(--shadow-soft)]">
              <div className="grid gap-0 md:grid-cols-2">
                <div className="flex flex-col gap-5 p-8">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--surface-pill)] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[color:var(--brand-secondary)]">
                    Guia exclusivo
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-32">
                      <Image src="/logo-blog.svg" alt="Citi Imóveis" fill className="object-contain" priority />
                    </div>
                    <span className="text-sm text-[color:var(--text-muted)]">Conteúdo oficial</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
                      {hero?.frontmatter.category ?? "Conteúdo"}
                    </p>
                    <h1 className="mt-3 text-3xl font-semibold leading-tight text-[color:var(--brand-secondary)] md:text-4xl">
                      {hero?.frontmatter.title ?? "Insights imobiliários em primeira mão"}
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-[color:var(--text-muted)]">
                      {hero?.frontmatter.description ??
                        "Análises profundas sobre compra, venda e investimentos em imóveis com a curadoria da Citi."}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={hero ? `/${hero.slug}` : "/buscar"}
                      className="inline-flex items-center justify-center rounded-full bg-[color:var(--brand-primary)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition hover:bg-[color:var(--brand-primary-dark)]"
                    >
                      Ler guia completo
                    </Link>
                    <a
                      className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] px-6 py-3 text-sm font-semibold text-[color:var(--brand-secondary)] hover:border-[color:var(--brand-primary)]"
                      href={SITE.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Falar com especialista
                    </a>
                  </div>
                </div>
                <div className="relative min-h-[320px] bg-[color:var(--brand-secondary)]">
                  <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,107,0,0.35)] via-transparent to-[rgba(0,0,0,0.7)]" />
                  <div className="absolute inset-6 rounded-[28px] border border-white/15 bg-[url('https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center shadow-[inset_0_0_0_1000px_rgba(0,0,0,0.25)]" />
                  <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-4 text-sm text-[color:var(--brand-secondary)] shadow-lg">
                    Indicadores ao vivo · <span className="font-semibold text-[color:var(--brand-primary)]">Mercado Imobiliário</span>
                  </div>
                </div>
              </div>
            </article>

            <aside className="rounded-[32px] border border-[color:var(--border)] bg-[color:var(--surface-2)] p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-muted)]">Especial</p>
                  <h2 className="mt-1 text-xl font-semibold text-[color:var(--brand-secondary)]">Encontre um lar para chamar de seu</h2>
                </div>
                <span className="rounded-full bg-[color:var(--surface-card)] px-3 py-1 text-xs font-semibold text-[color:var(--brand-secondary)]">
                  Citi imóveis
                </span>
              </div>

              <div className="mt-5 grid gap-3 text-sm">
                <label className="font-medium text-[color:var(--text)]">Cidade</label>
                <input
                  className="h-11 rounded-2xl border border-[color:var(--border)] bg-white px-4 text-sm outline-none focus:border-[color:var(--brand-primary)]"
                  placeholder="Busque por cidade"
                />
                <label className="font-medium text-[color:var(--text)]">Bairro</label>
                <input
                  className="h-11 rounded-2xl border border-[color:var(--border)] bg-white px-4 text-sm outline-none focus:border-[color:var(--brand-primary)]"
                  placeholder="Busque por bairro"
                />
                <button className="mt-4 inline-flex h-12 items-center justify-center rounded-2xl bg-[color:var(--brand-secondary)] text-sm font-semibold text-white transition hover:bg-black">
                  Buscar imóvel
                </button>
              </div>

              <div className="mt-6 rounded-2xl bg-white/80 p-4 text-xs text-[color:var(--text-muted)]">
                Atendimento humanizado no WhatsApp: <br />
                <a className="font-semibold text-[color:var(--brand-primary)]" href={SITE.whatsappUrl} target="_blank" rel="noreferrer">
                  +55 (31) 98479-9472
                </a>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-muted)]">Conteúdo em destaque</p>
              <h2 className="mt-1 text-3xl font-semibold tracking-tight text-[color:var(--brand-secondary)]">Destaques editoriais</h2>
            </div>
            <Link className="text-sm font-semibold text-[color:var(--brand-primary)]" href="/buscar">
              Ver todos os artigos
            </Link>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[hero, ...highlighted].filter(Boolean).map((p) => (
              <PostCard key={p!.slug} post={p!} variant="hero" />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-[color:var(--border)] bg-white py-12">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-muted)]">Categorias</p>
              <h2 className="mt-1 text-2xl font-semibold text-[color:var(--brand-secondary)]">Explore por tema</h2>
            </div>
            <div className="rounded-full bg-[color:var(--surface-pill)] px-4 py-2 text-xs font-semibold text-[color:var(--brand-secondary)]">
              SEO focado em jornadas reais
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/categoria/${c.slug}`}
                className="flex items-center justify-between rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-muted)] px-5 py-4 text-sm font-semibold text-[color:var(--brand-secondary)] hover:border-[color:var(--brand-primary)]"
              >
                <span>{c.name}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-muted)]">Atualizações</p>
                  <h2 className="mt-1 text-2xl font-semibold text-[color:var(--brand-secondary)]">Últimos artigos</h2>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {latest.map((p) => (
                  <PostCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
            <aside className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-[color:var(--brand-secondary)]">Mais lidos</div>
              <div className="mt-4 grid gap-3">
                {mostRead.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/${p.slug}`}
                    className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-muted)] px-4 py-3 hover:border-[color:var(--brand-primary)]"
                  >
                    <div className="text-sm font-semibold text-[color:var(--brand-secondary)]">{p.frontmatter.title}</div>
                    <div className="mt-1 text-xs text-[color:var(--text-muted)]">{p.readingTimeText}</div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-[color:var(--brand-secondary)] p-5 text-white">
                <div className="text-sm font-semibold">Precisa de orientação personalizada?</div>
                <p className="mt-2 text-sm/6 text-white/80">
                  Receba uma curadoria completa da Citi com imóveis alinhados ao seu perfil.
                </p>
                <a
                  className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-white text-sm font-semibold text-[color:var(--brand-secondary)]"
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
