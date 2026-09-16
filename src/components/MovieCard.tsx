import { Link } from "react-router-dom";
import type { MovieType } from "../types/movie";
import { REVEAL, useScrollReveal } from "../animations";

function MovieCard({ title, id, poster, year }: MovieType) {
  const revealRef = useScrollReveal<HTMLAnchorElement>({
    stagger: REVEAL.stagger,
  });

  return (
    <Link to={`/movies/${id}`} ref={revealRef} className="movie-card">
      <img src={poster} alt={title} />
      <div className="movie-card-body">
        <h3>{title}</h3>
        <p>{year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
