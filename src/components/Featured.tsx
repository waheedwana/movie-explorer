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
  "tt0110912",
  "tt0468569",
  "tt0137523",
  "tt0114369",
  "tt0102926",
  "tt0120737",
  "tt0167261",
  "tt0317248",
  "tt0118799",
  "tt0120815",
  "tt0209144",
  "tt0172495",
  "tt0407887",
  "tt0482571",
  "tt0993846",
  "tt1853728",
  "tt0361748",
  "tt2582802",
  "tt2380307",
  "tt0910970",
  "tt7286456",
  "tt4154796",
  "tt0073486",
  "tt0110413",
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
