const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

export async function getLatestVideos(limit = 6): Promise<Video[]> {
  if (!API_KEY || !CHANNEL_ID) {
    console.error("Faltan configurar las variables de entorno para YouTube API");
    return [];
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${limit}&type=video`,
      { next: { revalidate: 3600 } }
    );

    const data = await res.json();

    if (!data.items) {
      return [];
    }

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      publishedAt: item.snippet.publishedAt,
    }));
  } catch (error) {
    console.error("Error obteniendo los videos de YouTube:", error);
    return [];
  }
}