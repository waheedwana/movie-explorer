import { Link } from "react-router-dom";
import type { MovieType } from "../types/movie";
function MovieCard({ title, id, poster, year }: MovieType) {
  return (
    <Link to={`/movies/${id}`} className="movie-card">
      <img src={poster} alt={title} />
      <div className="movie-card-body">
        <h3>{title}</h3>
        <p>{year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
