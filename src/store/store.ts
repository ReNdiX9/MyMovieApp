import type { Movie, CurrentMoviesCategories } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  //state for query search and function to update it
  query: string;
  setQuery: (query: string) => void;
  //state for  movie list and function to update it
  movies: Movie[];
  setMovies: (movie: Movie[]) => void;
  //state for movies category(popular, top_rated and upcoming) and function  for it
  category: CurrentMoviesCategories;
  setCategory: (category: CurrentMoviesCategories) => void;
  // favorites: normalized by id -> Movie
  favoriteById: Record<number, Movie>;
  toggleFavorite: (movie: Movie) => void;
  clearFavorites: () => void;
};

export const useSearchStore = create<State>()(
  persist(
    (set, get) => ({
      query: "",
      setQuery: (q) => set({ query: q }),
      movies: [],
      setMovies: (m: Movie[]) => set({ movies: m }),
      category: "popular",
      setCategory: (c: CurrentMoviesCategories) => set({ category: c }),
      favoriteById: {},
      toggleFavorite: (movie) => {
        const map = { ...get().favoriteById };
        const movieId = Number(movie.id);
        if (map[movieId]) {
          delete map[movieId];
        } else {
          map[movieId] = movie;
        }
        set({ favoriteById: map });
      },

      clearFavorites: () => set({ favoriteById: {} }),
    }),
    {
      name: "Movie storage",
    }
  )
);
