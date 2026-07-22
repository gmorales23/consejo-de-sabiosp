/**
 * Configuración central del sitio.
 *
 * Los IDs de playlist salen de variables de entorno (ver .env.example) para
 * que no haya que tocar código cuando cambien. Los "consejeros" (integrantes
 * del podcast) sí están acá porque cambian poco — edita este arreglo cuando
 * quieras actualizar fotos, roles o bios.
 */

export const site = {
  nombre: "Consejo de Sabios",
  descripcion:
    "El podcast donde se delibera todo lo del Deportivo Táchira: capítulos, entrevistas y archivo histórico del Aurinegro.",
  equipo: "Deportivo Táchira",
  url: "https://consejodesabios.vercel.app",
};

export const PLAYLISTS = {
  capitulos: process.env.YOUTUBE_PLAYLIST_CAPITULOS,
  entrevistas: process.env.YOUTUBE_PLAYLIST_ENTREVISTAS,
  archivo: process.env.YOUTUBE_PLAYLIST_ARCHIVO,
} as const;

export type Consejero = {
  slug: string;
  nombre: string;
  rol: string;
  bio: string;
  foto?: string;
  // Opcional: si este consejero tiene su propia playlist de columnas/segmentos.
  playlistId?: string;
};

// TODO: reemplaza estos datos de ejemplo con los integrantes reales del
// podcast. El campo `foto` espera una ruta dentro de /public, por ejemplo
// "/consejeros/nombre.jpg".
export const CONSEJEROS: Consejero[] = [
  {
    slug: "consejero-1",
    nombre: "Consejero Uno",
    rol: "Anfitrión",
    bio: "Escribe aquí una bio corta: de dónde es, hace cuánto sigue al Táchira, y qué aporta a la mesa del consejo.",
  },
  {
    slug: "consejero-2",
    nombre: "Consejero Dos",
    rol: "Analista táctico",
    bio: "Escribe aquí una bio corta: de dónde es, hace cuánto sigue al Táchira, y qué aporta a la mesa del consejo.",
  },
  {
    slug: "consejero-3",
    nombre: "Consejero Tres",
    rol: "Historiador del Aurinegro",
    bio: "Escribe aquí una bio corta: de dónde es, hace cuánto sigue al Táchira, y qué aporta a la mesa del consejo.",
  },
];
