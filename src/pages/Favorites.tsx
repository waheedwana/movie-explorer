import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";
import { EmptyState } from "../components/EmptyState";
import { Link } from "react-router-dom";

function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <section className="page favorites-page">
        <div className="container">
          <div className="page-header">
            <span className="eyebrow">Your collection</span>
            <h1>Favorites</h1>
            <p>Every film you love, gathered in one place.</p>
          </div>
          <div className="results-area">
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
        <div className="page-header">
          <span className="eyebrow">Your collection</span>
          <h1>Favorites</h1>
          <p>Every film you love, gathered in one place.</p>
        </div>
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
