import type { YouTubeVideo } from "@/lib/youtube";
import { VideoGallery } from "./VideoGallery";

type Props = {
  numero: string;
  titulo: string;
  descripcion: string;
  videos: YouTubeVideo[];
  actaPrefix: string;
  emptyMessage: string;
};

export function SectionPage({
  numero,
  titulo,
  descripcion,
  videos,
  actaPrefix,
  emptyMessage,
}: Props) {
  return (
    <section className="py-16">
      <div className="container-page">
        <p className="eyebrow mb-3">Expediente {numero}</p>
        <h1
          className="text-4xl sm:text-6xl mb-4"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "0.01em" }}
        >
          {titulo}
        </h1>
        <p className="text-[var(--color-paper-dim)] max-w-xl mb-12">{descripcion}</p>

        <VideoGallery videos={videos} actaPrefix={actaPrefix} emptyMessage={emptyMessage} />
      </div>
    </section>
  );
}
