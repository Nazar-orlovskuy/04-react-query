import React, { JSX, useState } from 'react';
import toast from 'react-hot-toast';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import styles from '../App/App.module.css';

export default function App(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {

    setMovies([]);
    setError(null);

    try {
  const results = await fetchMovies({ query });

  if (!results || results.length === 0) {
    toast('No movies found for your request.');
    setMovies([]);
  } else {
    setMovies(results);
  }
} catch (err) {
  setError('There was an error fetching movies.');
  toast.error('There was an error fetching movies.');
} finally {
  setLoading(false);
}
  };
  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      <main className={styles.main}>
        {loading && <Loader />}
        {error && !loading && <ErrorMessage />}
        {!loading && !error && movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={(m) => setSelectedMovie(m)} />
        )}
      </main>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
