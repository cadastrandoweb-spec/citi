import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SITE } from "@/lib/site";
import { FloatingWhatsApp } from "@/components/conversion/FloatingWhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Blog | Citi Imóveis",
    template: "%s | Blog Citi Imóveis",
  },
  description:
    "Conteúdos completos sobre compra, venda, investimento e financiamento imobiliário. Dicas práticas e guias para tomar decisões com segurança.",
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: "Blog | Citi Imóveis",
    title: "Blog | Citi Imóveis",
    description:
      "Conteúdos completos sobre compra, venda, investimento e financiamento imobiliário.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Citi Imóveis",
    description:
      "Conteúdos completos sobre compra, venda, investimento e financiamento imobiliário.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-dvh bg-[color:var(--surface)] text-[color:var(--text)]">
          <SiteHeader />
          <main className="pb-16">{children}</main>
          <SiteFooter />
          <FloatingWhatsApp />
        </div>
      </body>
    </html>
  );
}
