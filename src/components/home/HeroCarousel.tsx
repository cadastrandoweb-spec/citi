"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/posts";

export function HeroCarousel({ posts }: { posts: Post[] }) {
  const slides = useMemo(() => posts.slice(0, 3), [posts]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!slides.length) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(id);
  }, [slides.length]);

  if (!slides.length) return null;

  const current = slides[index];
  const background = current.frontmatter.image?.url ??
    "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?auto=format&fit=crop&w=1800&q=80";
  const hasMultiple = slides.length > 1;

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-[color:var(--border)] bg-[color:var(--brand-secondary)] text-white shadow-[var(--shadow-soft)]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(120deg, rgba(0,0,0,.65), rgba(0,0,0,.3)), url(${background})` }}
      />
      {hasMultiple ? (
        <div className="absolute top-6 right-6 z-20 flex items-center gap-3 rounded-full bg-black/35 px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
          <div className="flex items-center gap-1">
            {slides.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                onClick={() => setIndex(idx)}
                className={`h-2.5 w-6 rounded-full transition ${
                  idx === index ? "bg-white" : "bg-white/30"
                }`}
                aria-label={`Mostrar destaque ${idx + 1}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIndex((prev) => (prev - 1 + slides.length) % slides.length)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30"
              aria-label="Anterior"
            >
              ←
            </button>
            <button
              onClick={() => setIndex((prev) => (prev + 1) % slides.length)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30"
              aria-label="Próximo"
            >
              →
            </button>
          </div>
        </div>
      ) : null}

      <div className="relative z-10 grid gap-10 p-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em]">
            {current.frontmatter.category}
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            {current.frontmatter.title}
          </h1>
          <p className="mt-3 text-base text-white/80">
            {current.frontmatter.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/${current.slug}`}
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--brand-primary)] px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition hover:bg-[color:var(--brand-primary-dark)]"
            >
              Ler artigo completo
            </Link>
            <Link
              href="/buscar"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white/90 hover:border-white"
            >
              Ver todos os guias
            </Link>
          </div>
        </div>
        <div className="rounded-[28px] bg-white/10 p-5 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Resumo</p>
          <p className="mt-2 text-sm text-white/90">
            Tempo de leitura: {current.readingTimeText}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Tags</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(current.frontmatter.tags ?? []).slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-white/15 px-3 py-1 text-xs text-white/90">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
