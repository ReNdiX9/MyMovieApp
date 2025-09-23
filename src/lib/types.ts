//type for Movie
export type Movie = {
  id: number;
  adult?: boolean;
  original_language?: string;
  genre?: GenreCode[];
  original_title?: string;
  overview?: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  vote_average: number;
  vote_count: number;
};

//Tabs type
export type CurrentMoviesCategories = "popular" | "top_rated" | "upcoming";

//genre type
export const Genres = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  ScienceFiction: 878,
  TVMovie: 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
} as const;

export type GenreCode = (typeof Genres)[keyof typeof Genres];

export type GenreName = keyof typeof Genres;
