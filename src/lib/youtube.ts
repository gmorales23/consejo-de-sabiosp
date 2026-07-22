export type YouTubeVideo = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
};

const API_BASE = "https://www.googleapis.com/youtube/v3";

// Cuánto tiempo (en segundos) se guarda en caché la respuesta antes de
// volver a pedirle la lista a YouTube. 3600 = 1 hora.
const REVALIDATE_SECONDS = 3600;

type PlaylistItem = {
  snippet?: {
    title?: string;
    description?: string;
    publishedAt?: string;
    resourceId?: { videoId?: string };
    thumbnails?: {
      maxres?: { url: string };
      standard?: { url: string };
      high?: { url: string };
      medium?: { url: string };
      default?: { url: string };
    };
  };
  contentDetails?: {
    videoId?: string;
    videoPublishedAt?: string;
  };
};

/**
 * Trae los videos de una playlist pública de YouTube usando la Data API v3.
 * Si falta la API key, el ID de playlist, o la petición falla, devuelve un
 * arreglo vacío en lugar de romper el build — las páginas ya saben mostrar
 * un estado vacío ("expediente sin videos todavía").
 */
export async function getPlaylistVideos(
  playlistId: string | undefined,
  maxResults = 12
): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    console.warn(
      "[youtube] Falta la variable de entorno YOUTUBE_API_KEY. Configúrala en .env.local o en Vercel."
    );
    return [];
  }

  if (!playlistId) {
    return [];
  }

  try {
    const url = new URL(`${API_BASE}/playlistItems`);
    url.searchParams.set("part", "snippet,contentDetails");
    url.searchParams.set("maxResults", String(maxResults));
    url.searchParams.set("playlistId", playlistId);
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString(), {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[youtube] Error ${res.status} pidiendo playlist ${playlistId}:`, body);
      return [];
    }

    const data = (await res.json()) as { items?: PlaylistItem[] };

    return (data.items ?? [])
      .filter((item) => {
        const title = item.snippet?.title;
        return title && title !== "Private video" && title !== "Deleted video";
      })
      .map((item) => {
        const thumbs = item.snippet?.thumbnails;
        return {
          id: item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId ?? "",
          title: item.snippet?.title ?? "",
          description: item.snippet?.description ?? "",
          thumbnail:
            thumbs?.maxres?.url ??
            thumbs?.standard?.url ??
            thumbs?.high?.url ??
            thumbs?.medium?.url ??
            thumbs?.default?.url ??
            "",
          publishedAt:
            item.contentDetails?.videoPublishedAt ?? item.snippet?.publishedAt ?? "",
        };
      })
      .filter((video) => video.id);
  } catch (error) {
    console.error(`[youtube] No se pudo conectar con la API para la playlist ${playlistId}:`, error);
    return [];
  }
}

/**
 * Resuelve el ID de la playlist de "subidos" de un canal (todos sus videos
 * públicos, en orden). Es el método recomendado por Google para traer los
 * videos de un canal — a diferencia de `search.list`, no dispara las reglas
 * de autorización pensadas para herramientas de administración de canal.
 */
async function getUploadsPlaylistId(channelId: string): Promise<string | null> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return null;

  try {
    const url = new URL(`${API_BASE}/channels`);
    url.searchParams.set("part", "contentDetails");
    url.searchParams.set("id", channelId);
    url.searchParams.set("key", apiKey);

    const res = await fetch(url.toString(), {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error(`[youtube] Error ${res.status} resolviendo playlist de subidos:`, await res.text());
      return null;
    }

    const data = (await res.json()) as {
      items?: Array<{ contentDetails?: { relatedPlaylists?: { uploads?: string } } }>;
    };

    return data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null;
  } catch (error) {
    console.error("[youtube] No se pudo conectar con la API (channels.list):", error);
    return null;
  }
}

/**
 * Respaldo: trae los últimos videos de TODO el canal (sin distinguir
 * sección) resolviendo primero su playlist de subidos y leyéndola con
 * playlistItems.list. Útil mientras el canal aún no está organizado en
 * playlists por Capítulos/Entrevistas/Archivo.
 */
export async function getChannelVideos(
  channelId: string | undefined,
  maxResults = 12
): Promise<YouTubeVideo[]> {
  if (!channelId) return [];

  const uploadsPlaylistId = await getUploadsPlaylistId(channelId);
  if (!uploadsPlaylistId) return [];

  return getPlaylistVideos(uploadsPlaylistId, maxResults);
}

/**
 * Función que usan las páginas: si la sección ya tiene su propia playlist,
 * la usa. Si no, cae de vuelta al feed general del canal — así el sitio
 * muestra contenido real desde el día uno, incluso antes de organizar
 * playlists por sección.
 */
export async function getSectionVideos(
  playlistId: string | undefined,
  maxResults = 12
): Promise<YouTubeVideo[]> {
  const fromPlaylist = await getPlaylistVideos(playlistId, maxResults);
  if (fromPlaylist.length > 0) {
    return fromPlaylist;
  }
  return getChannelVideos(process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID, maxResults);
}

export function formatFecha(iso: string): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("es-VE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}
