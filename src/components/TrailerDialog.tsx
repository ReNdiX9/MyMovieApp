// components/TrailerDialog.tsx
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Props } from "@/lib/types";

export default function TrailerDialog({ movieId, title, className }: Props) {
  const [open, setOpen] = useState(false);
  const [ytKey, setYtKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!open || ytKey || !movieId) return;
    let cancelled = false;

    const fetchTrailer = async () => {
      try {
        setLoading(true);
        setErr(null);
        const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=2f06df6daf4f704fffa29a95cf1f8393&language=en-US`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`TMDB /videos failed: ${res.status}`);
        const data = await res.json();

        if (!cancelled) {
          const results = data?.results ?? [];
          const trailer =
            results.find(
              (v: { site: string; type: string; official: boolean }) =>
                v.site === "YouTube" && v.type === "Trailer" && v.official
            ) ??
            results.find(
              (v: { site: string; type: string; official: boolean }) => v.site === "YouTube" && v.type === "Trailer"
            ) ??
            results.find((v: { site: string; type: string; official: boolean }) => v.site === "YouTube");
          if (trailer?.key) setYtKey(trailer.key);
          else setErr("No YouTube trailer found for this movie.");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (!cancelled) setErr(e?.message ?? "Failed to load trailer.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchTrailer();
    return () => {
      cancelled = true;
    };
  }, [open, ytKey, movieId]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => setYtKey(null), 150);
      setErr(null);
      setLoading(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className={className}>Watch Trailer</button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{title} — Trailer</DialogTitle>
        </DialogHeader>

        {loading && <div className="w-full aspect-video animate-pulse rounded-lg bg-muted" />}

        {!loading && err && <div className="text-sm text-red-500">{err}</div>}

        {!loading && !err && ytKey && (
          <div className="aspect-video w-full">
            <iframe
              className="h-full w-full rounded-lg"
              src={`https://www.youtube.com/embed/${ytKey}?autoplay=1&rel=0`}
              title={`${title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
