"use client";

import { useMemo, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function FloatingContactForm({ context }: { context: { postSlug?: string } }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const defaultSubject = useMemo(() => {
    if (context.postSlug) return `Lead - Blog (post: ${context.postSlug})`;
    return "Lead - Blog";
  }, [context.postSlug]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      subject: String(form.get("subject") ?? defaultSubject),
      body: String(form.get("body") ?? ""),
      postSlug: context.postSlug ?? null,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus("sent");
      setMessage("Mensagem enviada. Em breve entraremos em contato.");
      (e.target as HTMLFormElement).reset();
      return;
    }

    const data = (await res.json().catch(() => null)) as
      | { error?: string }
      | null;
    setStatus("error");
    setMessage(data?.error ?? "Não foi possível enviar agora. Tente novamente.");
  }

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {open ? (
        <div className="w-[min(92vw,380px)] rounded-2xl border border-black/10 bg-white shadow-xl">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="text-sm font-semibold text-black">Fale com a Citi</div>
            <button
              type="button"
              className="rounded-full px-2 py-1 text-sm text-black/60 hover:text-black"
              onClick={() => setOpen(false)}
            >
              Fechar
            </button>
          </div>
          <div className="px-4 pb-4">
            <form className="grid gap-3" onSubmit={onSubmit}>
              <input
                className="h-11 rounded-xl border border-black/10 px-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-300)]"
                name="name"
                placeholder="Seu nome"
                required
              />
              <input
                className="h-11 rounded-xl border border-black/10 px-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-300)]"
                type="email"
                name="email"
                placeholder="Seu e-mail"
                required
              />
              <input
                className="h-11 rounded-xl border border-black/10 px-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-300)]"
                name="phone"
                placeholder="WhatsApp (opcional)"
              />
              <input
                className="h-11 rounded-xl border border-black/10 px-3 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-300)]"
                name="subject"
                defaultValue={defaultSubject}
                placeholder="Assunto"
              />
              <textarea
                className="min-h-24 rounded-xl border border-black/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--brand-300)]"
                name="body"
                placeholder="Como podemos ajudar?"
                required
              />

              <button
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[color:var(--brand-600)] text-sm font-semibold text-white hover:bg-[color:var(--brand-700)] disabled:opacity-60"
                disabled={status === "sending"}
                type="submit"
              >
                {status === "sending" ? "Enviando..." : "Enviar"}
              </button>

              {message ? (
                <div
                  className={`rounded-xl px-3 py-2 text-sm ${
                    status === "error"
                      ? "bg-red-50 text-red-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {message}
                </div>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}

      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-12 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-[color:var(--brand-900)] shadow-lg ring-1 ring-black/10 hover:bg-zinc-50"
          aria-label="Abrir formulário de contato"
        >
          Contato
        </button>
      ) : null}
    </div>
  );
}
