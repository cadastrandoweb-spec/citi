export const SITE = {
  name: "Blog | Citi Imóveis",
  domain: "blog.citiimoveis.com.br",
  url: "https://blog.citiimoveis.com.br",
  mainSiteUrl: "https://citiimoveis.com.br",
  contactEmail: "contato@citiimoveis.com.br",
  whatsappPhoneE164: "5531984799472",
  whatsappUrl: "https://wa.me/5531984799472",
  address:
    "Avenida Acadêmico Nilo Figueiredo, 2766, Santos Dumont, Lagoa Santa - MG - 33239-310",
} as const;

export function absoluteUrl(pathname: string) {
  if (!pathname.startsWith("/")) pathname = `/${pathname}`;
  return `${SITE.url}${pathname}`;
}
