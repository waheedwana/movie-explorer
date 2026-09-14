import type { MovieType } from "../types/movie";
import MovieCard from "./MovieCard";
function MovieGrid({ movies }: { movies: MovieType[] }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => {
        return <MovieCard key={movie.id} {...movie} />;
      })}
    </div>
  );
}

export default MovieGrid;
