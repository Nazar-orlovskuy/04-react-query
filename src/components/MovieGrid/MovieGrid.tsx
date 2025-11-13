import React, { JSX } from 'react';
import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';
import { makeImagePath } from '../../services/movieService';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps): JSX.Element | null {
  if (!movies || movies.length === 0) return null;

  return (
    <ul className={css.grid}>
      {movies.map((m) => (
        <li key={m.id}>
          <div className={css.card} onClick={() => onSelect(m)} role="button" tabIndex={0}>
            <img
              className={css.image}
              src={makeImagePath(m.poster_path, 'w500') || undefined}
              alt={m.title}
              loading="lazy"
            />
            <h2 className={css.title}>{m.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
