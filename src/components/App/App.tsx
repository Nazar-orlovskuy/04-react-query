import React, { JSX, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import type { Movie } from '../../types/movie';
import { fetchMovies, type TMDBSearchResponse } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import styles from '../App/App.module.css';

export default function App(): JSX.Element {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
  data,
  isLoading,
  isError,
  isFetching,
  isSuccess,
} = useQuery<TMDBSearchResponse>({
  queryKey: ['movies', query, page],
  queryFn: () => fetchMovies({ query, page }),
  enabled: !!query,
  placeholderData: (prev) => prev,
  staleTime: 1000 * 60 * 5,
});



  const showLoader = isLoading || (isFetching && !isLoading);

  // Коли запит успішний, але фільмів немає — показати toast-повідомлення
  useEffect(() => {
    if (isSuccess) {
      const found = data?.results?.length ?? 0;
      if (found === 0) {
        toast('No movies found for your request.');
      }
    }
  }, [isSuccess, data]);

  const handleSearch = (newQuery: string) => {
    if (newQuery.trim() === '') {
      toast.error('Enter a movie name.');
      return;
    }

    setQuery(newQuery);
    setPage(1);
  };

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />

      <main className={styles.main}>
        {showLoader && <Loader />}

        {isError && <ErrorMessage />}

        {!showLoader && !isError && movies.length > 0 && (
          <>
            <MovieGrid movies={movies} onSelect={(m) => setSelectedMovie(m)} />

            {totalPages > 1 && (
              <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => setPage(selected + 1)}
                forcePage={Math.max(0, page - 1)}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
                nextLabel="→"
                previousLabel="←"
              />
            )}
          </>
        )}
      </main>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}
