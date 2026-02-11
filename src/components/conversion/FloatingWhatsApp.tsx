"use client";

import { SITE } from "@/lib/site";

export function FloatingWhatsApp() {
  return (
    <a
      href={SITE.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--brand-600)] px-5 text-sm font-semibold text-white shadow-lg hover:bg-[color:var(--brand-700)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-300)]"
      aria-label="Falar no WhatsApp"
    >
      WhatsApp
    </a>
  );
}
