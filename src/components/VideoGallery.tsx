"use client";

import { useEffect, useState } from "react";
import type { YouTubeVideo } from "@/lib/youtube";
import { formatFecha } from "@/lib/youtube";
import { EmptyState } from "./EmptyState";

type Props = {
  videos: YouTubeVideo[];
  /** Prefijo mostrado en cada tarjeta, ej. "ACTA", "ENTREVISTA", "ARCHIVO" */
  actaPrefix: string;
  emptyMessage: string;
  /** Numeración inicial (para que "última sesión" en Inicio siga el conteo real) */
  startIndex?: number;
};

export function VideoGallery({ videos, actaPrefix, emptyMessage, startIndex = 1 }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId]);

  if (videos.length === 0) {
    return <EmptyState>{emptyMessage}</EmptyState>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, i) => (
          <button
            key={video.id}
            onClick={() => setActiveId(video.id)}
            className="card-acta group text-left overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-yellow)]"
          >
            <div className="relative aspect-video overflow-hidden bg-[var(--color-ink-3)]">
              {video.thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              ) : null}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                <span className="h-14 w-14 rounded-full bg-[var(--color-yellow)] text-[var(--color-ink)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </div>
              <span className="absolute top-2 left-2 eyebrow bg-black/70 px-2 py-1 !text-[var(--color-yellow)]">
                {actaPrefix} Nº {String(startIndex + i).padStart(3, "0")}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold leading-snug line-clamp-2">{video.title}</h3>
              {video.publishedAt ? (
                <p className="text-xs text-[var(--color-paper-dim)] mt-2 font-[var(--font-mono)]">
                  {formatFecha(video.publishedAt)}
                </p>
              ) : null}
            </div>
          </button>
        ))}
      </div>

      {activeId ? (
        <div
          className="video-modal-backdrop animate-fade-in"
          onClick={() => setActiveId(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="video-modal-frame" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeId}?autoplay=1`}
              title="Reproductor de video"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setActiveId(null)}
              className="absolute -top-10 right-0 eyebrow !text-[var(--color-paper)] hover:!text-[var(--color-yellow)]"
              aria-label="Cerrar video"
            >
              Cerrar ✕
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
