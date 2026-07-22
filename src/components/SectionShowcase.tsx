import Link from "next/link";
import type { YouTubeVideo } from "@/lib/youtube";
import { VideoGallery } from "./VideoGallery";

type Props = {
  numero: string; // "01", "02", "03"
  titulo: string;
  descripcion: string;
  videos: YouTubeVideo[];
  href: string;
  actaPrefix: string;
  emptyMessage: string;
};

export function SectionShowcase({
  numero,
  titulo,
  descripcion,
  videos,
  href,
  actaPrefix,
  emptyMessage,
}: Props) {
  return (
    <section className="py-16 border-t hairline">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="eyebrow mb-2">Expediente {numero}</p>
            <h2
              className="text-3xl sm:text-4xl"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.01em" }}
            >
              {titulo}
            </h2>
            <p className="text-[var(--color-paper-dim)] mt-2 max-w-xl">{descripcion}</p>
          </div>
          <Link href={href} className="btn-secondary shrink-0 self-start sm:self-end">
            Ver todo →
          </Link>
        </div>
        <VideoGallery
          videos={videos.slice(0, 3)}
          actaPrefix={actaPrefix}
          emptyMessage={emptyMessage}
        />
      </div>
    </section>
  );
}
