import Link from "next/link";

export function Pagination({
  basePath,
  page,
  totalPages,
  query,
}: {
  basePath: string;
  page: number;
  totalPages: number;
  query?: Record<string, string | number | undefined>;
}) {
  function href(p: number) {
    const sp = new URLSearchParams();
    const q = query ?? {};
    for (const [k, v] of Object.entries(q)) {
      if (v === undefined) continue;
      sp.set(k, String(v));
    }
    sp.set("page", String(p));
    return `${basePath}?${sp.toString()}`;
  }

  return (
    <nav className="mt-8 flex items-center justify-between" aria-label="Paginação">
      <Link
        className={`inline-flex h-10 items-center justify-center rounded-xl border border-black/10 px-4 text-sm ${
          page <= 1 ? "pointer-events-none opacity-50" : "hover:bg-zinc-50"
        }`}
        href={href(page - 1)}
        rel="prev"
      >
        Anterior
      </Link>
      <div className="text-sm text-black/60">
        Página <span className="font-semibold text-black">{page}</span> de {totalPages}
      </div>
      <Link
        className={`inline-flex h-10 items-center justify-center rounded-xl border border-black/10 px-4 text-sm ${
          page >= totalPages
            ? "pointer-events-none opacity-50"
            : "hover:bg-zinc-50"
        }`}
        href={href(page + 1)}
        rel="next"
      >
        Próxima
      </Link>
    </nav>
  );
}
