import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Download.module.css";
import Config from "@/constants";

gsap.registerPlugin(useGSAP);

const Download = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(phoneRef.current, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }).from(
        contentRef.current,
        {
          x: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      );
    },
    { scope: sectionRef },
  );

  return (
    <section className={styles.downloadSection} id="download" ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {/* Phone Image Section */}
          <div className={styles.imageSide} ref={phoneRef}>
            <div className={styles.blob}></div>
            <img
              src={Config.CDN_URL + "/images/android-phone.webp"}
              alt="Bonki App on Android"
              className={styles.phoneImg}
            />
          </div>

          {/* Text/Instructions Section */}
          <div className={styles.contentSide} ref={contentRef}>
            <h2 className={styles.title}>Get BunkMate for Android</h2>

            <div className={styles.instructions}>
              <div className={styles.step}>
                <span className={styles.stepNum}>1</span>
                <p>
                  Click the <strong>Download APK</strong> button below
                </p>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNum}>2</span>
                <p>
                  Open the file & tap <strong>Install</strong>
                </p>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNum}>3</span>
                <p>
                  Allow <em>"Unknown Sources"</em> if asked
                </p>
              </div>
              <div className={styles.step}>
                <span className={styles.stepNum}>4</span>
                <p>
                  You're ready to <strong>Bunk!</strong>
                </p>
              </div>
            </div>

            <a
              href={Config.APK_URL}
              className={styles.downloadBtnWrapper}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={Config.CDN_URL + "/images/down-apk.webp"}
                alt="Download APK"
                className={styles.downloadBtnImg}
              />
            </a>

            <p className={styles.versionInfo}>
              Version 2.0.1 • 95 MB • Android 8.0+
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;
