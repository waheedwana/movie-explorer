import { useCallback, useEffect, useRef, useState } from "react";
import { searchMovies } from "../services/movieApi";
import type { MovieType } from "../types/movie";

const SEED_QUERIES = [
  "star",
  "war",
  "night",
  "world",
  "king",
  "man",
  "life",
  "time",
  "last",
  "day",
  "girl",
  "game",
];

const MAX_PAGES_PER_QUERY = 4;
const PRELOAD_DISTANCE = 700;

interface InfiniteMoviesState {
  movies: MovieType[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
}

export function useInfiniteMovies(excludeIds: string[], enabled: boolean) {
  const [state, setState] = useState<InfiniteMoviesState>({
    movies: [],
    loading: false,
    error: null,
    hasMore: true,
  });
  const [loadTick, setLoadTick] = useState(0);

  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const queryIndexRef = useRef(0);
  const pageRef = useRef(1);
  const seenRef = useRef<Set<string>>(new Set());
  const excludeRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    excludeRef.current = new Set(excludeIds);
  }, [excludeIds]);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) {
      return;
    }

    loadingRef.current = true;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const query = SEED_QUERIES[queryIndexRef.current];
      const page = pageRef.current;
      const response = await searchMovies(query, page);
      const results = response.Search ?? [];

      const fresh: MovieType[] = [];
      for (const item of results) {
        if (item.Type !== "movie" || item.Poster === "N/A") {
          continue;
        }
        if (
          seenRef.current.has(item.imdbID) ||
          excludeRef.current.has(item.imdbID)
        ) {
          continue;
        }
        seenRef.current.add(item.imdbID);
        fresh.push({
          id: item.imdbID,
          title: item.Title,
          year: item.Year,
          poster: item.Poster,
        });
      }

      if (page >= MAX_PAGES_PER_QUERY || results.length === 0) {
        queryIndexRef.current += 1;
        pageRef.current = 1;
      } else {
        pageRef.current = page + 1;
      }

      const exhausted = queryIndexRef.current >= SEED_QUERIES.length;
      hasMoreRef.current = !exhausted;

      setState((prev) => ({
        movies: [...prev.movies, ...fresh],
        loading: false,
        error: null,
        hasMore: !exhausted,
      }));
    } catch (error) {
      hasMoreRef.current = false;
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Something went wrong",
        hasMore: false,
      }));
    } finally {
      loadingRef.current = false;
      setLoadTick((tick) => tick + 1);
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let frame = 0;
    const check = () => {
      const remaining =
        document.documentElement.scrollHeight -
        (window.innerHeight + window.scrollY);
      if (remaining <= PRELOAD_DISTANCE) {
        void loadMore();
      }
    };
    const schedule = () => {
      if (frame) {
        return;
      }
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        check();
      });
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    schedule();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [enabled, loadMore, loadTick]);

  return {
    movies: state.movies,
    loading: state.loading,
    error: state.error,
    hasMore: state.hasMore,
    loadMore,
  };
}
