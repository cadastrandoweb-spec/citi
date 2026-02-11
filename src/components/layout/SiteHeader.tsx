import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <Container>
        <div className="flex h-18 items-center justify-between gap-6 py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-32 items-center justify-center rounded-2xl border border-[color:var(--border)] bg-white px-3">
              <Image src="/citi.avif" alt="Citi Imóveis" width={90} height={32} className="object-contain" priority />
            </div>
            <div className="leading-tight">
              <div className="text-sm uppercase tracking-[0.2em] text-[color:var(--text-muted)]">Blog</div>
              <div className="text-lg font-semibold text-[color:var(--text)]">Citi Imóveis</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-[color:var(--text-muted)] lg:flex">
            <Link className="font-medium text-[color:var(--text)] hover:text-[color:var(--brand-primary)]" href="/">
              Início
            </Link>
            <Link className="hover:text-[color:var(--brand-primary)]" href="/buscar">
              Guias & Dicas
            </Link>
            <Link className="hover:text-[color:var(--brand-primary)]" href="/categoria/investimentos-imobiliarios">
              Investimentos
            </Link>
            <a className="hover:text-[color:var(--brand-primary)]" href={`${SITE.mainSiteUrl}/busca`} target="_blank" rel="noreferrer">
              Buscar imóvel
            </a>
            <a className="hover:text-[color:var(--brand-primary)]" href={`${SITE.mainSiteUrl}/contato`} target="_blank" rel="noreferrer">
              Contato
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              className="inline-flex h-11 items-center justify-center rounded-full bg-[color:var(--brand-primary)] px-5 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition hover:bg-[color:var(--brand-primary-dark)]"
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              Atendimento WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}
