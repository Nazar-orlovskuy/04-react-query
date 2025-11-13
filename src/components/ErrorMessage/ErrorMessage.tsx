import React, { JSX } from 'react';
import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps): JSX.Element {
  return (
    <p className={css.text}>
      {message ?? 'There was an error, please try again...'}
    </p>
  );
}

