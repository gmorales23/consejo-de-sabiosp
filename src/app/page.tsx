import { getLatestVideos } from "@/lib/youtube";

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
  );
}