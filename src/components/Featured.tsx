import { useCallback } from "react";
import { getMovieById } from "../services/movieApi";
import useFetch from "../hooks/useFetch";
import MovieCard from "./MovieCard";
const FEATURED_IDS = [
  "tt1228705",
  "tt1300854",
  "tt0371746",
  "tt0120338",
  "tt0411906",
  "tt0837564",
  "tt0133093",
  "tt0109830",
  "tt0111161",
  "tt1375666",
  "tt0816692",
  "tt0167260",
  "tt0108052",
  "tt0088763",
  "tt0068646",
  "tt6751668",
  "tt0245429",
  "tt4975722",
];

function Featured() {
  const fetchFeaturedMovies = useCallback((signal: AbortSignal) => {
    return Promise.all(FEATURED_IDS.map((id) => getMovieById(id, signal)));
  }, []);
  const { data, loading, error } = useFetch(fetchFeaturedMovies);
  if (loading) {
    return <p className="featured-status">Loading...</p>;
  }
  if (error) {
    return <p className="featured-status">{error}</p>;
  }
  if (!data) {
    return null;
  }
  const movies = data.map((movie) => {
    return {
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    };
  });

  return (
    <>
      {movies.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </>
  );
}
export default Featured;
