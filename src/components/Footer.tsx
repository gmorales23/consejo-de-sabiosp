import { site } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t hairline mt-24">
      <div className="container-page py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p
            className="text-sm"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.02em" }}
          >
            CONSEJO DE SABIOS
          </p>
          <p className="text-xs text-[var(--color-paper-dim)] mt-1 max-w-md">
            Deliberando sobre el {site.equipo} desde la barra, no desde el palco.
          </p>
        </div>
        <p className="eyebrow !text-[var(--color-paper-dim)]">
          © {new Date().getFullYear()} — Sesión abierta
        </p>
      </div>
    </footer>
  );
}
