import { useSearchStore } from "@/store/store";
import MovieCard from "./MovieCard";

export default function FavoriteMovies() {
  const favorites = Object.values(useSearchStore((s) => s.favoriteById));
  const removeAll = useSearchStore((s) => s.clearFavorites);
  return (
    <div className="border-t mt-4">
      <div className="flex justify-between p-6 items-center">
        <h1 className="text-2xl  font-bold   ">Favorite Movies</h1>
        <button onClick={removeAll} className="cursor-pointer hover:underline underline-offset-2">
          Remove all
        </button>
      </div>
      <section
        className={
          favorites.length ? "grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-2" : "p-6"
        }
      >
        {!favorites.length ? (
          <div className="text-center text-gray-400">No favorites yet. Click the heart on any movie to save it.</div>
        ) : (
          favorites.map((m) => <MovieCard key={m.id} {...m} />)
        )}
      </section>
    </div>
  );
}
