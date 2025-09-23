// components/MovieDetail.tsx

import { useSearchStore } from "@/store/store";
import { useParams } from "react-router";

//const API_KEY = "2f06df6daf4f704fffa29a95cf1f8393";

export default function MovieDetail() {
  const { id } = useParams<string>();
  const movie = useSearchStore((s) => s.movies.find((m) => m.id == (id as unknown as number)));
  return (
    <>
      <p>{movie?.id}</p>
      <p>{movie?.adult ? <span>Yes</span> : <span>No</span>}</p>
      <p>{movie?.title}</p>
      <p>{movie?.original_title || "N/A"}</p>
      <p>{movie?.original_language}</p>
      <p></p>
    </>
  );
}
