import React, { JSX } from 'react';
import css from './Loader.module.css';

export default function Loader(): JSX.Element {
  return <p className={css.text}>Loading movies, please wait...</p>;
}
