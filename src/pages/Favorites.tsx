import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";
import { EmptyState } from "../components/EmptyState";
import { Link } from "react-router-dom";
import { useScrollReveal } from "../animations";

function Favorites() {
  const { favorites } = useFavorites();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const contentRef = useScrollReveal<HTMLDivElement>({ delay: 80 });

  const header = (
    <div ref={headerRef} className="page-header">
      <span className="eyebrow">Your collection</span>
      <h1>Favorites</h1>
      <p>Every film you love, gathered in one place.</p>
    </div>
  );

  if (favorites.length === 0) {
    return (
      <section className="page favorites-page">
        <div className="container">
          {header}
          <div ref={contentRef} className="results-area">
            <EmptyState
              title="No favorites yet"
              message="Please add your favorite movies and they will show up here."
            />
            <div className="favorites-cta">
              <Link className="btn btn-primary" to="/movies">
                Browse movies
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page favorites-page">
      <div className="container">
        {header}
        <div className="movie-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Favorites;
