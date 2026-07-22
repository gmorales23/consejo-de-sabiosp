import type { Metadata } from "next";
import { SectionPage } from "@/components/SectionPage";
import { PLAYLISTS } from "@/lib/site-config";
import { getPlaylistVideos } from "@/lib/youtube";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Archivo",
};

export default async function ArchivoPage() {
  const videos = await getPlaylistVideos(PLAYLISTS.archivo, 24);

  return (
    <SectionPage
      numero="03"
      titulo="Archivo"
      descripcion="Expedientes históricos del Aurinegro: momentos, temporadas y hechos que el Consejo no deja prescribir."
      videos={videos}
      actaPrefix="ARCHIVO"
      emptyMessage="Todavía no hay material de archivo conectado. Configura YOUTUBE_PLAYLIST_ARCHIVO en las variables de entorno."
    />
  );
}
