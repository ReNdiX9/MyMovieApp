// components/MovieDetail.tsx

import { useSearchStore } from "@/store/store";
import { languageLabel, genreNames, extractGenreIds } from "../lib/formatter";
import { useParams } from "react-router";
import { type LanguageCode } from "@/lib/types";
import TrailerDialog from "./TrailerDialog";

const IMG = "https://image.tmdb.org/t/p/w342";

export default function MovieDetail() {
  const { id } = useParams<string>();
  const movie = useSearchStore((s) => s.movies.find((m) => m.id == (id as unknown as number)));
  const lang = languageLabel(movie?.original_language as LanguageCode);
  const genres = genreNames(extractGenreIds(movie ?? {}));

  if (!movie) {
    return <p className="p-4 text-center">Movie not found</p>;
  }

  return (
    <div className="p-4 flex gap-8">
      <img src={`${IMG}${movie.poster_path}`} alt={movie.title} className="w-80 rounded-3xl" />
      <div>
        <h1 className="text-3xl font-bold">
          {movie.title}{" "}
          {movie.title !== movie.original_title && (
            <span className="font-light text-2xl">({movie?.original_title})</span>
          )}
        </h1>
        <p className="mt-4 text-lg font-semibold">{movie.overview}</p>
        <div className="flex gap-2 flex-col mt-2">
          <p>
            Release date:{" "}
            <span className="italic">
              {new Date(movie.release_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </span>
          </p>
          <p>
            Original Language: <span className="italic">{lang}</span>
          </p>
          <p>
            Genre: <span className="italic">{genres.length ? genres.join(", ") : "—"}</span>
          </p>
          <div className="flex gap-4 md:gap-8">
            <p>
              Average: <span className="italic">{movie.vote_average.toFixed(1)}</span>
            </p>
            <p>
              {" "}
              Review Count:<span className="italic">{movie.vote_count.toLocaleString("en-US")}</span>
            </p>
          </div>
          <TrailerDialog
            movieId={Number(id)}
            title={movie.title}
            className="bg-red-500 border-2 w-fit rounded-lg px-2 py-1.5 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
