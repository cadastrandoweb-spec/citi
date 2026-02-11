"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchForm() {
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <form
      className="flex w-full items-center gap-2"
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
        placeholder="Buscar no blog..."
        className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-300)]"
        name="q"
      />
      <button
        className="inline-flex h-12 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--brand-600)] px-5 text-sm font-semibold text-white shadow-sm hover:bg-[color:var(--brand-700)]"
        type="submit"
      >
        Buscar
      </button>
    </form>
  );
}
