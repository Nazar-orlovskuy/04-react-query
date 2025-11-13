import React, { JSX } from 'react';
import css from './ErrorMessage.module.css';

export default function ErrorMessage(): JSX.Element {
  return <p className={css.text}>There was an error, please try again...</p>;
}
