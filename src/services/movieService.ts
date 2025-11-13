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

export interface FetchMoviesParams {
  query: string;
  page?: number;
  include_adult?: boolean;
}

export interface TMDBSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}


export async function fetchMovies(
  params: FetchMoviesParams
): Promise<TMDBSearchResponse> {
  const response = await axiosInstance.get<TMDBSearchResponse>('/search/movie', {
    params: {
      query: params.query,
      page: params.page ?? 1,
      include_adult: params.include_adult ?? false,
    },
  });

  return response.data;
}

export function makeImagePath(
  path: string | null,
  size: 'w500' | 'original' = 'w500'
): string {
  if (!path) return '';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
