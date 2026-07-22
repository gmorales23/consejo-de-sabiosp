import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";
import { PLAYLISTS } from "@/lib/site-config";
import { getSectionVideos } from "@/lib/youtube";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Capítulos",
};

export default async function CapitulosPage() {
  const videos = await getSectionVideos(PLAYLISTS.capitulos, 24);

  return (
    <SectionPage
      numero="01"
      titulo="Capítulos"
      descripcion="Las sesiones completas del Consejo: análisis, deliberación y veredicto sobre cada jornada del Táchira."
      videos={videos}
      actaPrefix="ACTA"
      emptyMessage="Todavía no hay capítulos conectados. Configura YOUTUBE_PLAYLIST_CAPITULOS en las variables de entorno."
    />
  );
}
