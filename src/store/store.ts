import type { Movie } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  //state for query search and function to update it
  query: string;
  setQuery: (query: string) => void;
  //state for  movie list and function to update it
  movies: Movie[];
  setMovies: (movie: Movie[]) => void;
};

export const useSearchStore = create<State>()(
  persist(
    (set) => ({
      query: "",
      setQuery: (q) => set({ query: q }),
      movies: [],
      setMovies: (m: Movie[]) => set({ movies: m }),
    }),
    {
      name: "search-storage",
    }
  )
);
