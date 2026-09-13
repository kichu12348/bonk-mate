import React from 'react';
import styles from './FooterBar.module.css';

/**
 * FooterBar component
 * Single Responsibility: Display the bottom editorial slogans flanking the page
 * in alignment with the drafting guidelines.
 */
export const FooterBar: React.FC = () => {
  return (
    <footer className={styles.footer} aria-label="Page footer">
      {/* Bottom Left Slogan */}
      <div className={styles.bottomLeft}>
        <span className={styles.dash} aria-hidden="true">—</span>
        <div className={styles.textStack}>
          <span className={styles.line}>Bunk smarter.</span>
          <span className={styles.boldLine}>Not harder.</span>
        </div>
      </div>

      {/* Bottom Right Slogan */}
      <div className={styles.bottomRight}>
        <div className={styles.textStackRight}>
          <span className={styles.line}>Your attendance.</span>
          <span className={styles.line}>Your call.</span>
        </div>
        <span className={styles.dash} aria-hidden="true">—</span>
      </div>
    </footer>
  );
};
