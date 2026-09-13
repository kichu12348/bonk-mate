import React from 'react';
import styles from './HandwrittenNote.module.css';

export interface HandwrittenNoteProps {
  lines: string[];
  rotation?: number;
  hasDoubleUnderline?: boolean;
  hasSmiley?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * HandwrittenNote component
 * Single Responsibility: Render doodle notes in a student notebook margin style
 * with sketched underlines and smiley faces.
 */
export const HandwrittenNote: React.FC<HandwrittenNoteProps> = ({
  lines,
  rotation = -8,
  hasDoubleUnderline = false,
  hasSmiley = false,
  className = '',
  style = {},
}) => {
  return (
    <div
      className={`${styles.noteContainer} ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        ...style,
      }}
      aria-label={lines.join(' ')}
    >
      <div className={styles.textWrapper}>
        {lines.map((line, index) => (
          <span key={index} className={styles.line}>
            {line}
          </span>
        ))}
      </div>

      {/* SVG Double Sketchy Underlines */}
      {hasDoubleUnderline && (
        <svg
          className={styles.underlineSvg}
          viewBox="0 0 160 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 5C45 3.5 110 5.5 158 4.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M8 11.5C52 10.2 118 12.2 152 11"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* Cute Hand-drawn Smiley Face */}
      {hasSmiley && (
        <svg
          className={styles.smileySvg}
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="9.5" cy="11.5" r="1.5" fill="currentColor" />
          <circle cx="18.5" cy="11.5" r="1.5" fill="currentColor" />
          <path
            d="M8.5 17C10.5 20.5 17.5 20.5 19.5 17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
};
