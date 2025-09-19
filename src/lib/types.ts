export type Movie = {
  id: string;
  adult?: boolean;
  original_language?: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  vote_average: number;
  vote_count: number;
};
