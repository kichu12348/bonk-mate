import React, { useRef } from "react";
import styles from "./Header.module.css";
import { useThemeStore } from "../../store/themeStore";
import { FaGithub } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { LOGO_URL, GITHUB_URL } from "../../constants";

/**
 * Header component
 * Single Responsibility: Navigation header displaying branding, slogan,
 * GitHub source code link, and circular theme toggle.
 */
export const Header: React.FC = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    let x = e.clientX;
    let y = e.clientY;

    // If triggered by keyboard or coords are missing, use the button center
    if ((!x && !y) || (x === 0 && y === 0)) {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      }
    }

    toggleTheme({ x, y });
  };

  return (
    <header className={styles.header}>
      {/* Brand & Slogan Left */}
      <div className={styles.leftBrand}>
        <img
          src={LOGO_URL}
          alt="BunkMate Logo"
          className={styles.logoImage}
          width="32"
          height="32"
        />
        <span className={styles.logoText}>BunkMate</span>
      </div>

      {/* Philosophy Right + Actions (GitHub & Theme Switcher) */}
      <div className={styles.rightInfo}>
        <span className={styles.motto}>SAME DEGREE. FEWER REGRETS.</span>
        <span className={styles.dash} aria-hidden="true">
          —
        </span>

        <div className={styles.actionsGroup}>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.actionBtn} ${styles.githubBtn}`}
            title="View source on GitHub"
            aria-label="GitHub repository"
          >
            <FaGithub className={styles.actionIcon} />
          </a>

          <button
            ref={buttonRef}
            className={`${styles.actionBtn} ${styles.themeToggleBtn}`}
            onClick={handleToggle}
            title={`Switch to ${theme === "light" ? "Dark" : "Light"} Mode`}
            aria-label="Toggle theme mode"
          >
            {theme === "light" ? (
              <FiMoon className={styles.actionIcon} />
            ) : (
              <FiSun className={styles.actionIcon} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
