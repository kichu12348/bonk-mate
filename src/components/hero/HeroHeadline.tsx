import React from 'react';
import styles from './HeroHeadline.module.css';

/**
 * HeroHeadline component
 * Single Responsibility: Renders the monumental hero headline 'BUNK.'
 * and its iconic spaced subtitle 'KNOW WHEN YOU CAN.'
 */
export const HeroHeadline: React.FC = () => {
  return (
    <section className={styles.heroSection} aria-label="Hero Title">
      <div className={styles.titleWrapper}>
        <h1 className={styles.heroTitle}>BUNK.</h1>
      </div>
      <p className={styles.heroSubtitle}>
        KNOW WHEN YOU CAN.
      </p>
    </section>
  );
};
