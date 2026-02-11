"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchForm() {
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <form
      className="flex w-full items-center gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (q.trim()) params.set("q", q.trim());
        router.push(`/buscar?${params.toString()}`);
      }}
      role="search"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Busque por temas, cidades ou palavras-chave"
        className="h-12 w-full rounded-full border border-[color:var(--border)] bg-white px-5 text-sm outline-none transition focus:border-[color:var(--brand-primary)]"
        name="q"
      />
      <button
        className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-primary)] px-6 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition hover:bg-[color:var(--brand-primary-dark)]"
        type="submit"
      >
        Buscar
      </button>
    </form>
  );
}
