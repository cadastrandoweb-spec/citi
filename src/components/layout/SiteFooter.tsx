import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <Container>
        <div className="grid gap-8 py-10 md:grid-cols-2">
          <div>
            <div className="text-base font-semibold text-[color:var(--brand-900)]">Citi Imóveis</div>
            <p className="mt-2 text-sm text-black/60">{SITE.address}</p>
          </div>
          <div className="md:text-right">
            <p className="text-sm text-black/60">
              E-mail: <a className="underline" href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
            </p>
            <p className="mt-2 text-sm text-black/60">
              WhatsApp: <a className="underline" href={SITE.whatsappUrl} target="_blank" rel="noreferrer">+55 (31) 98479-9472</a>
            </p>
          </div>
        </div>
        <div className="py-6 text-xs text-black/50">
          © {new Date().getFullYear()} Citi Imóveis. Todos os direitos reservados.
        </div>
      </Container>
    </footer>
  );
}
