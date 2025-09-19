import type { Movie } from "@/lib/types";

const IMG = "https://image.tmdb.org/t/p/w342";

export default function MovieCard({
  overview,
  popularity,
  poster_path,
  release_date,
  title,
  vote_average,
  vote_count,
}: Movie) {
  const posterUrl = poster_path ? `${IMG}${poster_path}` : "/placeholder-poster.png";

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <img src={posterUrl} alt={title} className="h-72 w-full object-cover" loading="lazy" />
      <h1>{title}</h1>
      <p>{overview}</p>
      <p>Popularity: {popularity}</p>
      <p>Release: {new Date(release_date).getFullYear()}</p>
      <p>
        Rating: {vote_average} ({vote_count} votes)
      </p>
    </div>
  );
}
