import { useCallback } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { getMovieById } from "../services/movieApi";
import useFetch from "../hooks/useFetch";
import { Loading } from "../components/Loading";
import { ErrorMessage } from "../components/ErrorMessage";
import type { MovieDetail, MovieType } from "../types/movie";
import { useFavorites } from "../context/FavoritesContext";

const FALLBACK_POSTER = "https://via.placeholder.com/400x600?text=No+Image";

function MovieDetails() {
  const { id = "" } = useParams();
  const location = useLocation();
  const { toggleFavorite, isFavorite } = useFavorites();

  const fetcher = useCallback(
    (signal: AbortSignal) => getMovieById(id, signal),
    [id],
  );
  const { data, loading, error } = useFetch(fetcher);
  if (loading) return <Loading label="Loading movie details..." />;
  if (error || !data || data.Response === "False") {
    return (
      <div className="container page">
        <ErrorMessage message={error ?? data?.Error ?? "Movie not found."} />
        <Link
          to={
            location.pathname.includes("favorites") ? "/favorites" : "/movies"
          }
        >
          Back to movies
        </Link>
      </div>
    );
  }

  const movie: MovieDetail = data;
  const favorite = isFavorite(movie.imdbID);
  const favoriteMovie: MovieType = {
    id: movie.imdbID,
    title: movie.Title,
    poster: movie.Poster,
    year: movie.Year,
  };
  return (
    <section className="page">
      <div className="container">
        <Link to="/movies" className="back-link">
          ‹ Back to movies
        </Link>

        <div className="detail">
          <div className="detail-poster">
            <img
              src={movie.Poster === "N/A" ? FALLBACK_POSTER : movie.Poster}
              alt={`${movie.Title} poster`}
            />
          </div>

          <div className="detail-info">
            <h1>{movie.Title}</h1>
            <p className="detail-meta">
              {movie.Year}
              {movie.Runtime !== "N/A" && ` · ${movie.Runtime}`}
              {movie.Rated !== "N/A" && ` · Rated ${movie.Rated}`}
            </p>

            <div className="ratings">
              {movie.imdbRating !== "N/A" && (
                <span className="rating">
                  <strong>⭐ {movie.imdbRating}</strong>
                  <small>IMDb</small>
                </span>
              )}

              {movie.Metascore !== "N/A" && (
                <span className="rating">
                  <strong>{movie.Metascore}</strong>
                  <small>Metascore</small>
                </span>
              )}
            </div>

            {movie.Genre !== "N/A" && (
              <div className="genres">
                {movie.Genre.split(", ").map((g) => (
                  <span className="badge" key={g}>
                    {g}
                  </span>
                ))}
              </div>
            )}

            <p className="plot">{movie.Plot}</p>
            <dl className="detail-list">
              {movie.Director !== "N/A" && (
                <div>
                  <dt>Director</dt>
                  <dd>{movie.Director}</dd>
                </div>
              )}
              {movie.Writer !== "N/A" && (
                <div>
                  <dt>Writer</dt>
                  <dd>{movie.Writer}</dd>
                </div>
              )}
              {movie.Actors !== "N/A" && (
                <div>
                  <dt>Cast</dt>
                  <dd>{movie.Actors}</dd>
                </div>
              )}
              {movie.Language !== "N/A" && (
                <div>
                  <dt>Language</dt>
                  <dd>{movie.Language}</dd>
                </div>
              )}
              {movie.Country !== "N/A" && (
                <div>
                  <dt>Country</dt>
                  <dd>{movie.Country}</dd>
                </div>
              )}
              {movie.Awards !== "N/A" && (
                <div>
                  <dt>Awards</dt>
                  <dd>{movie.Awards}</dd>
                </div>
              )}
              {movie.BoxOffice !== "N/A" && (
                <div>
                  <dt>Box Office</dt>
                  <dd>{movie.BoxOffice}</dd>
                </div>
              )}
            </dl>

            <button
              className={`btn ${favorite ? "btn-fav" : "btn-primary"}`}
              type="button"
              onClick={() => toggleFavorite(favoriteMovie)}
            >
              {favorite ? "💔 Remove from Favorites" : "❤️ Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
