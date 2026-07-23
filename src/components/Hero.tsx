import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="grain-bg border-b hairline overflow-hidden">
      <div className="container-page py-16 sm:py-24 grid md:grid-cols-[1.2fr,0.8fr] gap-12 items-center">
        <div>
          <p className="eyebrow mb-4">Expediente abierto — {site.equipo}</p>
          <h1
            className="text-5xl sm:text-7xl leading-[0.95]"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "0.01em" }}
          >
            CONSEJO
            <br />
            DE SABIOS
          </h1>
          <p className="mt-6 text-lg text-[var(--color-paper-dim)] max-w-lg leading-relaxed">
            {site.descripcion}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/capitulos" className="btn-primary">
              Ver sesiones
            </Link>
            <Link href="/el-consejo" className="btn-secondary">
              Conocer al Consejo
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center py-6">
          <Image
            src="/images/logo-yoda.png"
            alt="Consejo de Sabios - Podcast Logo"
            width={256}
            height={256}
            className="w-56 h-56 sm:w-72 sm:h-72"
            priority
          />
        </div>
      </div>
    </section>
  );
}
