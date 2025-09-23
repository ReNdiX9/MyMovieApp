import type { Movie } from "@/lib/types";
import { useSearchStore } from "@/store/store";
import Rating from "@mui/material/Rating";
import { HeartPlus, HeartMinus } from "lucide-react";
import { useState } from "react";

const IMG = "https://image.tmdb.org/t/p/w342";

function shortenTitle(title: string): string {
  if (!title) return "";

  const separators = [":", "-"];

  for (const sep of separators) {
    if (title.includes(sep) && !title.includes("-")) {
      return title.split(sep)[0].trim();
    } else {
      return title.split("-")[0].trim(); // Take only the part before
    }
  }

  return title;
}

function movieRating(vote_average: number): number {
  vote_average = Math.round(vote_average * 10) / 10; // Round to one decimal place
  return Math.round(vote_average) / 2; // Convert to 5-star scale and round to nearest half
}

function popularityLabel(popularity: number): number | string {
  const score = new Intl.NumberFormat("en-US").format(Math.round(popularity));
  if (Number(score) > 200) return "Very High";
  if (Number(score) > 100) return "High";
  if (Number(score) > 50) return "Medium";
  return "Low";
}

export default function MovieCard(movie: Movie) {
  const { id, title, poster_path, popularity, release_date, vote_average, vote_count } = movie;
  const posterUrl = `${IMG}${poster_path}`;

  const [hovered, setHovered] = useState(false);
  const toggleFavorite = useSearchStore((s) => s.toggleFavorite);
  const isFav = useSearchStore((s) => !!s.favoriteById[Number(id)]);

  return (
    <div
      className="border rounded-lg shadow-lg hover:opacity-85 transition hover:border-accent-foreground cursor-pointer  relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={posterUrl} alt={title} className="h-80 w-full object-cover rounded-lg" loading="lazy" />
      <button
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        className={`absolute top-3 right-3  ${hovered ? "flex" : "hidden"} cursor-pointer`}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(movie);
        }}
      >
        {isFav ? <HeartMinus className="h-6 w-6 fill-red-500  text-red-700" /> : <HeartPlus className="h-6 w-6 " />}
      </button>
      <div className="px-3 py-1.5 ">
        <h1 className="text-lg font-bold text-center">{shortenTitle(title)}</h1>
        <p className="font-medium">
          Popularity: <span className="italic">{popularityLabel(popularity)}</span>
        </p>
        <p className="font-medium">
          Release: <span className="italic">{new Date(release_date).getFullYear()}</span>
        </p>
        <div className="flex items-center  justify-between ">
          <Rating
            name="half-rating"
            defaultValue={movieRating(vote_average)}
            precision={0.5}
            readOnly
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#facc15",
              },
              "& .MuiRating-iconEmpty": {
                color: "#444",
              },
            }}
          />
          <span className="text-gray-400">{vote_count} votes</span>
        </div>
      </div>
    </div>
  );
}
