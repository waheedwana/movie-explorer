import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useCallback } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { searchMovies } from "../services/movieApi";
import useFetch from "../hooks/useFetch";
import { EmptyState } from "../components/EmptyState";
import { ErrorMessage } from "../components/ErrorMessage";
import { Loading } from "../components/Loading";
import MovieGrid from "../components/MovieGrid";

const PAGE_SIZE = 10;
function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromUrl = searchParams.get("search") ?? "";
  const [input, setInput] = useState(searchFromUrl);
  const debounced = useDebounce(input, 1000);
  const pageFromUrl = Number(searchParams.get("page") || 1);

  const updateSearchParam = useCallback(
    (value: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value) {
          next.set("search", value);
        } else {
          next.delete("search");
        }
        return next;
      });
    },
    [setSearchParams],
  );
  useEffect(() => {
    if (debounced !== searchFromUrl) {
      updateSearchParam(debounced);
    }
  }, [debounced, searchFromUrl, updateSearchParam]);

  const goToPage = useCallback(
    (page: number) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.set("page", String(page));
        return next;
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [setSearchParams],
  );

  const query = searchFromUrl.trim();
  const fetcher = useCallback(
    (signal: AbortSignal) => searchMovies(query, pageFromUrl, signal),
    [query, pageFromUrl],
  );

  const { data, loading, error } = useFetch(fetcher);

  const totalPages = data?.totalResults
    ? Math.ceil(Number(data.totalResults) / PAGE_SIZE)
    : 0;

  const movies =
    data?.Search?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
    })) ?? [];
  return (
    <section className="page">
      <div className="container">
        <div className="page-header">
          <span className="eyebrow">The catalogue</span>
          <h1>Movies</h1>
          <p>Search across a hand-picked collection of essential cinema.</p>
        </div>

        <SearchBar
          value={input}
          onChange={setInput}
          placeholder="Search movies... e.g Batman"
          disabled={loading}
        />

        <div className="results-area">
          {query === "" ? (
            <EmptyState
              title="Start Searching"
              message="Type a movie title above to see results."
            />
          ) : loading ? (
            <Loading label={`Searching for "${query}"...`} />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : !data?.Search || data.Search.length === 0 ? (
            <EmptyState
              title="No results found"
              message={`We couldn't find any movies matching "${query}" Try a different title.`}
            />
          ) : (
            <>
              <p className="results-count">
                Showig {data.Search.length}{" "}
                {data.Search.length === 1 ? "result" : "results"}
                {data.totalResults ? `of ${data.totalResults}` : ""} for "
                {query}"
              </p>
              <MovieGrid movies={movies} />

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => goToPage(pageFromUrl - 1)}
                    disabled={pageFromUrl <= 1}
                  >
                    ‹ Prev
                  </button>

                  <span className="page-info">
                    Page {pageFromUrl} of {totalPages}
                  </span>

                  <button
                    type="button"
                    className="btn"
                    onClick={() => goToPage(pageFromUrl + 1)}
                    disabled={pageFromUrl >= totalPages}
                  >
                    Next ›
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Movies;
