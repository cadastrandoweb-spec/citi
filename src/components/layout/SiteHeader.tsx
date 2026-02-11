import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-black/5 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-semibold tracking-tight text-[color:var(--brand-900)]">
              Citi Imóveis
            </Link>
            <span className="hidden text-sm text-black/50 sm:inline">Blog</span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-black/70 md:flex">
            <Link className="hover:text-black" href="/buscar">
              Buscar
            </Link>
            <a className="hover:text-black" href={`${SITE.mainSiteUrl}/busca`} target="_blank" rel="noreferrer">
              Buscar imóvel
            </a>
            <a className="hover:text-black" href={`${SITE.mainSiteUrl}/contato`} target="_blank" rel="noreferrer">
              Contato
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              className="inline-flex h-10 items-center justify-center rounded-full bg-[color:var(--brand-600)] px-4 text-sm font-semibold text-white shadow-sm hover:bg-[color:var(--brand-700)]"
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}
