import { API_BASE_URL, API_KEY } from "../config";
import type { MovieDetail, SearchResponse } from "../types/movie";

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Http request failed ${response.status}`);
  }
  const data = (await response.json()) as T;
  return data;
}

export async function searchMovies(
  query: string,
  page = 1,
  signal?: AbortSignal,
): Promise<SearchResponse> {
  const params = new URLSearchParams({
    apikey: API_KEY,
    s: query,
    page: String(page),
  });
  return fetchJson<SearchResponse>(
    `${API_BASE_URL}/?${params.toString()}`,
    signal,
  );
}
export async function getMovieById(
  id: string,
  signal?: AbortSignal,
): Promise<MovieDetail> {
  const url = `${API_BASE_URL}?apikey=${API_KEY}&i=${id}`;
  return fetchJson<MovieDetail>(url, signal);
}
