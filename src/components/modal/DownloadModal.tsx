import React, { useEffect, useState } from 'react';
import styles from './DownloadModal.module.css';
import { FaApple, FaAndroid, FaGithub } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { GITHUB_URL, VERSION_API_URL } from '../../constants';

export interface VersionResponse {
  version: string;
  download_url: string;
}

export interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * DownloadModal component
 * Single Responsibility: Dialog presenting installation channels for students.
 * Clearly specifies that BunkMate is exclusively for Android.
 */
export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [versionData, setVersionData] = useState<VersionResponse | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchVersion = async () => {
      try {
        const response = await fetch(VERSION_API_URL);
        if (response.ok) {
          const data: VersionResponse = await response.json();
          if (isMounted) setVersionData(data);
        }
      } catch (err) {
        console.warn("Could not fetch version in modal:", err);
      }
    };

    if (isOpen) {
      fetchVersion();
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.headerTitleGroup}>
            <span className={styles.pillBadge}>ANDROID EXCLUSIVE</span>
            <h3 id="modal-title" className={styles.modalTitle}>
              Get BunkMate
            </h3>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close download modal"
          >
            ✕
          </button>
        </div>

        <p className={styles.modalDesc}>
          BunkMate is currently built and released exclusively for Android devices.
        </p>

        <div className={styles.platformsGrid}>
          {/* Android Card (Primary) */}
          {versionData?.download_url ? (
            <a
              href={versionData.download_url}
              download
              className={`${styles.platformCard} ${styles.primaryCard}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Download Android APK"
            >
              <div className={`${styles.platformIcon} ${styles.androidIcon}`}>
                <FaAndroid />
              </div>
              <div className={styles.platformInfo}>
                <span className={styles.platformName}>
                  Android APK {versionData.version ? `(v${versionData.version})` : ''}
                </span>
                <span className={styles.platformSub}>Direct download • Ready to install</span>
              </div>
              <div className={styles.actionBadge}>
                <FiDownload />
                <span>Download</span>
              </div>
            </a>
          ) : (
            <div className={`${styles.platformCard} ${styles.primaryCard}`}>
              <div className={`${styles.platformIcon} ${styles.androidIcon}`}>
                <FaAndroid />
              </div>
              <div className={styles.platformInfo}>
                <span className={styles.platformName}>Android</span>
                <span className={styles.platformSub}>Direct APK download</span>
              </div>
              <span className={styles.platformStatus}>Available</span>
            </div>
          )}

          {/* Apple iOS Card (Unavailable) */}
          <div className={`${styles.platformCard} ${styles.disabledCard}`}>
            <div className={styles.platformIcon}>
              <FaApple />
            </div>
            <div className={styles.platformInfo}>
              <span className={styles.platformName}>Apple iOS</span>
              <span className={styles.platformSub}>Not supported • Android only</span>
            </div>
            <span className={styles.platformStatusUnavailable}>Unavailable</span>
          </div>

          {/* GitHub Source Code Card */}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.platformCard}
            title="View BunkMate source code on GitHub"
          >
            <div className={styles.platformIcon}>
              <FaGithub />
            </div>
            <div className={styles.platformInfo}>
              <span className={styles.platformName}>Source Code</span>
              <span className={styles.platformSub}>GitHub • Open Source & Releases</span>
            </div>
            <span className={styles.platformStatus}>Public</span>
          </a>
        </div>

        <div className={styles.modalFooter}>
          <span className={styles.privacyNote}>
            🔒 100% On-device privacy • Zero telemetry • Completely free
          </span>
        </div>
      </div>
    </div>
  );
};
