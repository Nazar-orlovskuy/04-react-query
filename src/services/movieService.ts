import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';

// Отримуємо ключ із .env
const myKey = import.meta.env.VITE_API_KEY as string | undefined;

if (!myKey) {
  console.warn('VITE_API_KEY is not set — API requests will fail.');
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${myKey ?? ''}`,
    'Content-Type': 'application/json',
  },
});

interface FetchMoviesParams {
  query: string;
  page?: number;
  include_adult?: boolean;
}

interface TMDBSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

/**
 * Пошук фільмів через TMDB API.
 * Повертає лише дані з results.
 */
export async function fetchMovies(
  params: FetchMoviesParams
): Promise<Movie[]> {
  const response = await axiosInstance.get<TMDBSearchResponse>('/search/movie', {
    params: {
      query: params.query,
      page: params.page ?? 1,
      include_adult: params.include_adult ?? false,
    },
  });

  return response.data.results;
}

/**
 * Створює повний шлях до зображення TMDB.
 */
export function makeImagePath(
  path: string | null,
  size: 'w500' | 'original' = 'w500'
): string {
  if (!path) return '';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
