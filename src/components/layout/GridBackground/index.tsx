import React from 'react';
import styles from './GridBackground.module.css';

/**
 * GridBackground component
 * Single Responsibility: Renders the editorial drafting grid lines and tick marks
 * creating the authentic print/notebook layout shown in the design.
 */
export const GridBackground: React.FC = () => {
  return (
    <div className={styles.gridContainer} aria-hidden="true">
      {/* Vertical Guideline Columns */}
      <div className={`${styles.vLine} ${styles.vLineLeft}`} />
      <div className={`${styles.vLine} ${styles.vLineCenterLeft}`} />
      <div className={`${styles.vLine} ${styles.vLineCenterRight}`} />
      <div className={`${styles.vLine} ${styles.vLineRight}`} />

      {/* Horizontal Guideline Rows */}
      <div className={`${styles.hLine} ${styles.hLineHeader}`} />
      <div className={`${styles.hLine} ${styles.hLineHeroBottom}`} />
      <div className={`${styles.hLine} ${styles.hLineCardBottom}`} />
      <div className={`${styles.hLine} ${styles.hLineFooter}`} />

      {/* Crosshair / Registration Marks */}
      <div className={`${styles.crosshair} ${styles.chTopLeft}`} />
      <div className={`${styles.crosshair} ${styles.chTopRight}`} />
      <div className={`${styles.crosshair} ${styles.chBottomLeft}`} />
      <div className={`${styles.crosshair} ${styles.chBottomRight}`} />
    </div>
  );
};
