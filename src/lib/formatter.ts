import { Language, type GenreName, Genres, type LanguageCode } from "./types";

export function languageLabel(code: LanguageCode): string {
  if (!code) return "Unknown";
  return Language[code] ?? code.toUpperCase();
}

export function genreNames(codes: number[] | undefined): string[] {
  if (!codes?.length) return [];
  const idToName = new Map<number, GenreName>(
    Object.entries(Genres).map(([name, id]) => [id as number, name as GenreName])
  );
  return codes
    .map((id) => (typeof id === "string" ? Number(id) : id)) // handle "28" as string
    .map((id) => idToName.get(id))
    .filter((name): name is GenreName => Boolean(name))
    .map((name) => (name === "ScienceFiction" ? "Science Fiction" : name === "TVMovie" ? "TV Movie" : name));
}

// Normalize genres from either list or detail responses
export function extractGenreIds(movie: {
  genre_ids?: number[];
  genres?: { id: number }[];
  genre?: number[];
}): number[] {
  if (Array.isArray(movie?.genre_ids)) return movie.genre_ids; // list endpoints
  if (Array.isArray(movie?.genres)) return movie.genres.map((g: { id: number }) => g.id); // detail endpoint
  if (Array.isArray(movie?.genre)) return movie.genre; // your custom field (if ever set)
  return [];
}
