<<<<<<< HEAD
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
=======
import { getLatestVideos } from "./lib/youtube";

export default async function HomePage() {
  const videos = await getLatestVideos(6);

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-6 md:p-12">
      {/* Encabezado Principal */}
      <header className="max-w-6xl mx-auto mb-12 text-center border-b border-yellow-500/20 pb-8">
        <h1 className="text-4xl md:text-6xl font-black text-yellow-400 tracking-tight mb-2">
          CONSEJO DE SABIOS
        </h1>
        <p className="text-neutral-400 text-lg md:text-xl">
          El podcast de la actualidad del Deportivo Táchira 🟡⚫
        </p>
      </header>

      {/* Sección de Episodios Recientes */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-yellow-400 flex items-center gap-2">
          <span className="w-3 h-3 bg-yellow-400 rounded-full inline-block"></span>
          Últimos Episodios
        </h2>

        {videos.length === 0 ? (
          <p className="text-neutral-500">
            Cargando episodios... Si no se muestran, verifica las credenciales de YouTube en Vercel.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <article 
                key={video.id} 
                className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-yellow-500/50 transition-all group"
              >
                {/* Imagen del Video */}
                <div className="aspect-video relative overflow-hidden bg-neutral-800">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Detalles del Video */}
                <div className="p-4 flex flex-col justify-between">
                  <h3 className="font-bold text-lg line-clamp-2 text-neutral-100 group-hover:text-yellow-400 transition-colors">
                    {video.title}
                  </h3>
                  <a 
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-center px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors text-sm"
                  >
                    Ver en YouTube
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
>>>>>>> 3a1a0a404e27e3d8f820e1f9bd0a315e5595d515
  );
}
