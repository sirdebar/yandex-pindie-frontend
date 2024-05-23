import React from 'react';
import styles from './GameNotFound.module.css';

export const GameNotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.subtitle}>Мы старались, но найти страницу не смогли...</p> <br></br>Может попробуете еще раз?
    </div>
  );
}


