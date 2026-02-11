import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { FloatingContactForm } from "@/components/conversion/FloatingContactForm";
import { Mdx } from "@/lib/mdx";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { absoluteUrl, SITE } from "@/lib/site";
import {
  blogPostingSchema,
  breadcrumbSchema,
  faqSchema,
  jsonLdString,
} from "@/lib/seo";

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const canonical = absoluteUrl(`/${post.slug}`);
  const ogImage = absoluteUrl("/og/default-post.svg");

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords: post.frontmatter.keywords,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url: canonical,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      images: [ogImage],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 4);

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Artigo", href: "/" },
    { name: post.frontmatter.title, href: `/${post.slug}` },
  ];

  const breadcrumb = breadcrumbSchema([
    { name: "Home", href: "/" },
    { name: post.frontmatter.title, href: `/${post.slug}` },
  ]);

  const blogPosting = blogPostingSchema({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    urlPath: `/${post.slug}`,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.updatedAt,
    authorName: post.frontmatter.author?.name ?? "Citi Imóveis",
    image: absoluteUrl("/og/default-post.svg"),
    keywords: post.frontmatter.keywords,
  });

  const faq = post.frontmatter.faq?.length ? faqSchema(post.frontmatter.faq) : null;

  const shareUrl = absoluteUrl(`/${post.slug}`);
  const shareText = encodeURIComponent(post.frontmatter.title);

  return (
    <Container>
      <div className="py-10">
        <Breadcrumbs items={crumbs} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(blogPosting) }}
        />
        {faq ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLdString(faq) }}
          />
        ) : null}

        <header className="mt-4 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-[color:var(--brand-700)]">
            {post.frontmatter.category}
          </div>
          <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-[color:var(--brand-900)] md:text-4xl">
            {post.frontmatter.title}
          </h1>
          <p className="mt-3 text-base leading-7 text-[color:var(--text-muted)]">
            {post.frontmatter.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-black/60">
            <span>{post.readingTimeText}</span>
            <span className="text-black/20">•</span>
            <span>Autor: {post.frontmatter.author?.name ?? "Citi Imóveis"}</span>
            <span className="text-black/20">•</span>
            <a
              className="font-semibold text-[color:var(--brand-700)]"
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              Falar no WhatsApp
            </a>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {(post.frontmatter.tags ?? []).map((t) => (
              <Link
                key={t}
                href={`/tag/${encodeURIComponent(t.toLowerCase())}`}
                className="rounded-full bg-zinc-50 px-3 py-1 text-xs text-black/60 ring-1 ring-black/10 hover:bg-zinc-100"
              >
                {t}
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold text-[color:var(--brand-900)] hover:bg-zinc-50"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
            >
              Compartilhar
            </a>
            <a
              className="inline-flex h-10 items-center justify-center rounded-xl border border-black/10 bg-white px-4 text-sm font-semibold text-[color:var(--brand-900)] hover:bg-zinc-50"
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`}
              target="_blank"
              rel="noreferrer"
            >
              Tweet
            </a>
          </div>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <article className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <Mdx source={post.content} />

            {post.frontmatter.faq?.length ? (
              <section className="mt-10 rounded-2xl bg-[color:var(--surface-2)] p-6">
                <h2 className="text-xl font-semibold text-[color:var(--brand-900)]">FAQ</h2>
                <div className="mt-4 grid gap-4">
                  {post.frontmatter.faq.map((item) => (
                    <div key={item.q} className="rounded-2xl bg-white p-4 ring-1 ring-black/10">
                      <div className="text-sm font-semibold text-black">{item.q}</div>
                      <div className="mt-2 text-sm text-black/60">{item.a}</div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="mt-10 rounded-2xl bg-[color:var(--brand-900)] p-6 text-white">
              <h2 className="text-xl font-semibold">Quer ajuda para escolher o imóvel certo?</h2>
              <p className="mt-2 text-sm text-white/80">
                Fale com a equipe da Citi Imóveis e receba uma curadoria de imóveis de acordo com o seu perfil.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-[color:var(--brand-900)]"
                  href={SITE.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Chamar no WhatsApp
                </a>
                <a
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 px-5 text-sm font-semibold text-white hover:bg-white/10"
                  href={`${SITE.mainSiteUrl}/busca`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver imóveis
                </a>
              </div>
            </section>
          </article>

          <aside className="h-fit rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-[color:var(--brand-900)]">Artigos relacionados</div>
            <div className="mt-4 grid gap-3">
              {related.map((p) => (
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

            <div className="mt-6 rounded-2xl bg-[color:var(--surface-2)] p-5">
              <div className="text-sm font-semibold text-[color:var(--brand-900)]">Newsletter</div>
              <p className="mt-2 text-sm text-black/60">
                Receba conteúdos e oportunidades no seu e-mail.
              </p>
              <div className="mt-3 grid gap-2">
                <a
                  className="inline-flex h-10 items-center justify-center rounded-xl bg-[color:var(--brand-600)] text-sm font-semibold text-white hover:bg-[color:var(--brand-700)]"
                  href={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent("Newsletter - Blog")}`}
                >
                  Assinar via e-mail
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <FloatingContactForm context={{ postSlug: post.slug }} />
    </Container>
  );
}
