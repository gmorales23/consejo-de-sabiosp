import type { Metadata } from "next";
import { CONSEJEROS } from "@/lib/site-config";
import { getPlaylistVideos } from "@/lib/youtube";
import { VideoGallery } from "@/components/VideoGallery";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "El Consejo",
};

export default async function ElConsejoPage() {
  const consejerosConVideos = await Promise.all(
    CONSEJEROS.map(async (consejero) => ({
      ...consejero,
      videos: await getPlaylistVideos(consejero.playlistId, 6),
    }))
  );

  return (
    <section className="py-16">
      <div className="container-page">
        <p className="eyebrow mb-3">Expediente 04</p>
        <h1
          className="text-4xl sm:text-6xl mb-4"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.01em" }}
        >
          El Consejo
        </h1>
        <p className="text-[var(--color-paper-dim)] max-w-xl mb-14">
          Los integrantes que se sientan a la mesa cada semana. Cada consejero tiene su propia
          columna — a medida que se definan, aquí aparecerán sus segmentos.
        </p>

        <div className="flex flex-col gap-16">
          {consejerosConVideos.map((consejero, i) => (
            <article key={consejero.slug} className="border-t hairline pt-10">
              <div className="flex flex-col sm:flex-row gap-6 sm:items-center mb-8">
                <div className="h-20 w-20 rounded-full bg-[var(--color-ink-3)] border hairline flex items-center justify-center shrink-0">
                  <span
                    className="text-2xl"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-yellow)" }}
                  >
                    {consejero.nombre.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="eyebrow mb-1">
                    Consejero {String(i + 1).padStart(2, "0")} — {consejero.rol}
                  </p>
                  <h2 className="text-2xl font-semibold">{consejero.nombre}</h2>
                  <p className="text-[var(--color-paper-dim)] mt-2 max-w-xl">{consejero.bio}</p>
                </div>
              </div>

              <VideoGallery
                videos={consejero.videos}
                actaPrefix="COLUMNA"
                emptyMessage={`Aún no hay una columna configurada para ${consejero.nombre}. Cuando definan el formato, conecta su playlist en lib/site-config.ts.`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
