// components/MovieDetail.tsx

import { useParams } from "react-router";

//const API_KEY = "2f06df6daf4f704fffa29a95cf1f8393";

export default function MovieDetail() {
  const { id } = useParams<string>();
  return <p> Item id: {id}</p>;
}
