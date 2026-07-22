import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";
import { PLAYLISTS } from "@/lib/site-config";
import { getPlaylistVideos } from "@/lib/youtube";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Entrevistas",
};

export default async function EntrevistasPage() {
  const videos = await getPlaylistVideos(PLAYLISTS.entrevistas, 24);

  return (
    <SectionPage
      numero="02"
      titulo="Entrevistas"
      descripcion="Testimonios directos: jugadores, cuerpo técnico y voces cercanas al club, interrogadas por el Consejo."
      videos={videos}
      actaPrefix="ENTREVISTA"
      emptyMessage="Todavía no hay entrevistas conectadas. Configura YOUTUBE_PLAYLIST_ENTREVISTAS en las variables de entorno."
    />
  );
}
