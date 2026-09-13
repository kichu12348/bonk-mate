import { useState } from "react";
import styles from "./App.module.css";
import { GridBackground } from "./components/layout/GridBackground";
import { Header } from "./components/header";
import { TimeSidebar } from "./components/hero/TimeSidebar";
import { HeroHeadline } from "./components/hero/HeroHeadline";
import { DownloadSection } from "./components/cta";
import { HandwrittenNote } from "./components/common/HandwrittenNote";
import { DownloadModal } from "./components/modal/DownloadModal";

export default function App() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  return (
    <div className={styles.pageWrapper}>
      {/* Editorial Drafting Grid Background Lines */}
      <GridBackground />

      {/* Top Header Bar */}
      <Header />

      {/* Responsive Main Layout */}
      <main className={styles.mainGrid}>
        {/* ================= Left Column (Desktop) ================= */}
        <aside className={styles.leftColumn} aria-label="Schedule sidebar">
          <div className={styles.sidebarSlot}>
            <TimeSidebar />
          </div>

          <div className={styles.leftFooterSlot}>
            <div className={styles.footerLeftText}>
              <span className={styles.dash} aria-hidden="true">
                —
              </span>
              <div>
                <span>Bunk smarter.</span>
                <strong>Not harder.</strong>
              </div>
            </div>
          </div>
        </aside>

        {/* ================= Center Column ================= */}
        <div className={styles.centerColumn}>
          {/* Mobile/Tablet Time Display */}
          <div className={styles.mobileTimeSlot}>
            <TimeSidebar />
          </div>

          {/* Monumental Hero Title */}
          <div className={styles.heroSlot}>
            <HeroHeadline />
          </div>

          {/* Download CTA Section */}
          <div className={styles.ctaSlot}>
            <DownloadSection
              onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
            />
          </div>

          {/* Mobile/Tablet Footer */}
          <div className={styles.mobileFooter}>
            <div>
              Bunk smarter. <strong>Not harder.</strong>
            </div>
            <div>
              <strong>Your attendance.</strong> Your call.
            </div>
          </div>
        </div>

        {/* ================= Right Column (Desktop) ================= */}
        <aside
          className={styles.rightColumn}
          aria-label="Annotations and motto"
        >
          <div className={styles.topRightDoodleSlot}>
            <HandwrittenNote
              lines={["better", "decisions", "for longer", "weekends."]}
              rotation={-8}
              hasDoubleUnderline={true}
            />
          </div>

          <div className={styles.rightDoodleSlot}>
            <HandwrittenNote
              lines={["same", "degree.", "fewer regrets."]}
              rotation={-10}
              hasDoubleUnderline={true}
            />
          </div>

          <div className={styles.rightFooterSlot}>
            <div className={styles.footerRightText}>
              <div>
                <span>Your attendance.</span>
                <span>Your call.</span>
              </div>
              <span className={styles.dash} aria-hidden="true">
                —
              </span>
            </div>
          </div>
        </aside>
      </main>

      {/* Download Channels Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
}
