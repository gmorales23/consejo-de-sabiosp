import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SectionShowcase } from "@/components/SectionShowcase";
import { PLAYLISTS, CONSEJEROS } from "@/lib/site-config";
import { getPlaylistVideos, getSectionVideos } from "@/lib/youtube";

// Vuelve a generar la página como máximo una vez por hora (ISR), para que
// los videos nuevos aparezcan solos sin necesitar un redeploy.
export const revalidate = 3600;

export default async function HomePage() {
  const [capitulos, entrevistas, archivo] = await Promise.all([
    // Capítulos cae de vuelta al feed general del canal mientras no exista
    // una playlist propia — así siempre hay contenido real desde el día uno.
    getSectionVideos(PLAYLISTS.capitulos, 3),
    getPlaylistVideos(PLAYLISTS.entrevistas, 3),
    getPlaylistVideos(PLAYLISTS.archivo, 3),
  ]);

  return (
    <>
      <Hero />

      <SectionShowcase
        numero="01"
        titulo="Capítulos"
        descripcion="Las sesiones completas del Consejo: análisis, deliberación y veredicto sobre cada jornada del Táchira."
        videos={capitulos}
        href="/capitulos"
        actaPrefix="ACTA"
        emptyMessage="Todavía no hay capítulos conectados. Configura YOUTUBE_PLAYLIST_CAPITULOS para que aparezcan aquí."
      />

      <SectionShowcase
        numero="02"
        titulo="Entrevistas"
        descripcion="Testimonios directos: jugadores, cuerpo técnico y voces cercanas al club, interrogadas por el Consejo."
        videos={entrevistas}
        href="/entrevistas"
        actaPrefix="ENTREVISTA"
        emptyMessage="Todavía no hay entrevistas conectadas. Configura YOUTUBE_PLAYLIST_ENTREVISTAS para que aparezcan aquí."
      />

      <SectionShowcase
        numero="03"
        titulo="Archivo"
        descripcion="Expedientes históricos del Aurinegro: momentos, temporadas y hechos que el Consejo no deja prescribir."
        videos={archivo}
        href="/archivo"
        actaPrefix="ARCHIVO"
        emptyMessage="Todavía no hay material de archivo conectado. Configura YOUTUBE_PLAYLIST_ARCHIVO para que aparezcan aquí."
      />

      <section className="py-16 border-t hairline">
        <div className="container-page">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="eyebrow mb-2">Expediente 04</p>
              <h2
                className="text-3xl sm:text-4xl"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.01em" }}
              >
                El Consejo
              </h2>
              <p className="text-[var(--color-paper-dim)] mt-2 max-w-xl">
                Los integrantes que se sientan a la mesa cada semana.
              </p>
            </div>
            <Link href="/el-consejo" className="btn-secondary shrink-0 self-start sm:self-end">
              Ver todo →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CONSEJEROS.map((consejero) => (
              <div key={consejero.slug} className="card-acta p-6">
                <div className="h-16 w-16 rounded-full bg-[var(--color-ink-3)] border hairline mb-4 flex items-center justify-center">
                  <span
                    className="text-xl"
                    style={{ fontFamily: "var(--font-display)", color: "var(--color-yellow)" }}
                  >
                    {consejero.nombre.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold">{consejero.nombre}</h3>
                <p className="eyebrow mt-1 mb-3">{consejero.rol}</p>
                <p className="text-sm text-[var(--color-paper-dim)] line-clamp-3">
                  {consejero.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
