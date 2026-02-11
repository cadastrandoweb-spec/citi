export type BlogCategory = {
  name: string;
  slug: string;
  seoTitle: string;
  seoDescription: string;
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    name: "Compra de Imóveis",
    slug: "compra-de-imoveis",
    seoTitle: "Compra de Imóveis: guia completo, dicas e passo a passo | Citi Imóveis",
    seoDescription:
      "Conteúdos completos sobre compra de imóveis: documentação, negociação, visita, segurança jurídica e melhores práticas.",
  },
  {
    name: "Venda de Imóveis",
    slug: "venda-de-imoveis",
    seoTitle: "Venda de Imóveis: como vender mais rápido e com segurança | Citi Imóveis",
    seoDescription:
      "Estratégias e checklist para vender imóveis com mais rapidez, precificação correta, documentação e marketing.",
  },
  {
    name: "Investimentos Imobiliários",
    slug: "investimentos-imobiliarios",
    seoTitle: "Investimentos Imobiliários: rentabilidade, riscos e oportunidades | Citi Imóveis",
    seoDescription:
      "Aprenda a investir em imóveis com visão de longo prazo: valorização, renda, análise de risco e oportunidades.",
  },
  {
    name: "Financiamento Imobiliário",
    slug: "financiamento-imobiliario",
    seoTitle: "Financiamento Imobiliário: taxas, entrada e aprovação | Citi Imóveis",
    seoDescription:
      "Entenda financiamento imobiliário: CET, simulação, documentação, aprovação e dicas para melhores condições.",
  },
  {
    name: "Mercado Imobiliário",
    slug: "mercado-imobiliario",
    seoTitle: "Mercado Imobiliário: tendências e análises | Citi Imóveis",
    seoDescription:
      "Tendências, análises e notícias do mercado imobiliário: preços, demanda e oportunidades para compradores e investidores.",
  },
  {
    name: "Dicas para Compradores",
    slug: "dicas-para-compradores",
    seoTitle: "Dicas para Compradores: checklist e boas práticas | Citi Imóveis",
    seoDescription:
      "Dicas práticas para compradores: visitas, avaliação, documentação, proposta e cuidados para evitar riscos.",
  },
  {
    name: "Dicas para Vendedores",
    slug: "dicas-para-vendedores",
    seoTitle: "Dicas para Vendedores: venda com estratégia | Citi Imóveis",
    seoDescription:
      "Dicas práticas para vendedores: precificação, apresentação do imóvel, documentação e negociação.",
  },
  {
    name: "Imóveis de Alto Padrão",
    slug: "imoveis-de-alto-padrao",
    seoTitle: "Imóveis de Alto Padrão: luxo, arquitetura e lifestyle | Citi Imóveis",
    seoDescription:
      "Conteúdos sobre imóveis de alto padrão: diferenciais, avaliação, arquitetura e tendências do segmento premium.",
  },
  {
    name: "Lançamentos Imobiliários",
    slug: "lancamentos-imobiliarios",
    seoTitle: "Lançamentos Imobiliários: oportunidades e dicas | Citi Imóveis",
    seoDescription:
      "Lançamentos imobiliários: vantagens, prazos, riscos e como escolher oportunidades com segurança.",
  },
  {
    name: "Valorização Imobiliária",
    slug: "valorizacao-imobiliaria",
    seoTitle: "Valorização Imobiliária: o que influencia o preço | Citi Imóveis",
    seoDescription:
      "Entenda valorização imobiliária: fatores de preço, infraestrutura, demanda e como analisar potencial de valorização.",
  },
];

export const BLOG_TAGS_SEED = [
  "compra de imóvel",
  "venda de imóvel",
  "financiamento",
  "documentação",
  "investimento",
  "alto padrão",
  "lançamentos",
  "valorização",
  "Lagoa Santa",
];
