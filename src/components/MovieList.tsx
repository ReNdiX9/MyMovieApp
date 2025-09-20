import { useEffect, useMemo, useState } from "react";

import MovieCard from "./MovieCard";
import { useSearchStore } from "@/store/store";

export default function MovieList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //store variables
  const movies = useSearchStore((s) => s.movies);
  const setMovies = useSearchStore((s) => s.setMovies);
  const query = useSearchStore((s) => s.query);

  const filteredMovies = useMemo(() => {
    if (!query.trim()) return movies;
    return movies.filter((m) => m.title.toLowerCase().includes(query.toLocaleLowerCase()));
  }, [movies, query]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=2f06df6daf4f704fffa29a95cf1f8393");
        const data = await res.json();
        setMovies(data.results);
        console.log("Movies set to store:", data.results);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Failed to fetch movies for store:", error);
        setError(error.message ?? "Failed to fetch");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [setMovies]);

  if (loading) return <p className="p-4 text-center text-2xl">Loading movies…</p>;
  if (error) return <p className="p-4 text-red-600 text-center text-2xl">Error: {error}</p>;

  if (filteredMovies.length === 0 && query.trim()) {
    return (
      <div className="p-4 text-center">
        <p className="text-xl text-gray-600">No movies found for "{query}"</p>
        <p className="text-sm text-gray-500 mt-2">Try a different search term</p>
      </div>
    );
  }

  return (
    <section className="grid gap-6  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-2">
      {filteredMovies.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </section>
  );
}
