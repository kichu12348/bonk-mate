import React, { useState } from "react";
import styles from "./DownloadSection.module.css";
import { FaAndroid } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { GITHUB_URL, VERSION_API_URL } from "../../constants";

export interface VersionResponse {
  version: string;
  download_url: string;
}

export interface DownloadSectionProps {
  onOpenDownloadModal?: () => void;
}

/**
 * DownloadSection component
 * Single Responsibility: Renders the primary CTA for Android APK download.
 * Fetches dynamic version & download URL on click, then initiates direct download.
 */
export const DownloadSection: React.FC<DownloadSectionProps> = ({
  onOpenDownloadModal,
}) => {
  const [versionData, setVersionData] = useState<VersionResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDownload = async () => {
    // If download URL is already cached in state, trigger download immediately
    if (versionData?.download_url) {
      const link = document.createElement("a");
      link.href = versionData.download_url;
      link.download = "";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await fetch(VERSION_API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: VersionResponse = await response.json();
      setVersionData(data);

      if (data.download_url) {
        const link = document.createElement("a");
        link.href = data.download_url;
        link.download = "";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (onOpenDownloadModal) {
        onOpenDownloadModal();
      }
    } catch (err) {
      console.error("Failed to fetch download url:", err);
      if (onOpenDownloadModal) {
        onOpenDownloadModal();
      } else {
        window.open(
          `${GITHUB_URL}/releases/latest`,
          "_blank",
          "noopener,noreferrer",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className={styles.ctaSection}
      aria-label="Download BunkMate for Android"
    >
      <div className={styles.ctaWrapper}>
        {/* Left vertical registration tick */}
        <div className={styles.tickLine} aria-hidden="true" />

        <button
          type="button"
          className={styles.ctaButton}
          onClick={handleDownload}
          disabled={isLoading}
          aria-label="Download BunkMate for Android"
        >
          <FaAndroid className={styles.androidBtnIcon} aria-hidden="true" />
          <span className={styles.buttonLabel}>
            {isLoading ? "Starting Download..." : "Download for Android"}
          </span>
          {versionData?.version && (
            <span className={styles.versionTag}>v{versionData.version}</span>
          )}
          <FiDownload
            className={styles.downloadIcon}
            aria-hidden="true"
          />
        </button>

        {/* Right vertical registration tick */}
        <div className={styles.tickLine} aria-hidden="true" />
      </div>

      {/* Value Propositions and Student Badges */}
      <div className={styles.metaContainer}>
        <p className={styles.badgeLine}>
          <span>FREE</span>
          <span className={styles.dot} aria-hidden="true">
            •
          </span>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.openSourceLink}
            title="BunkMate is 100% Free and Open Source on GitHub"
          >
            OPEN SOURCE
          </a>
          <span className={styles.dot} aria-hidden="true">
            •
          </span>
          <span>MADE FOR STUDENTS</span>
        </p>
      </div>
    </section>
  );
};
