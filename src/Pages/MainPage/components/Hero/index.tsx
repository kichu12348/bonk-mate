import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Hero.module.css";
import Config from "@/constants";

gsap.registerPlugin(useGSAP);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const dangerRef = useRef<HTMLImageElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const cloud1Ref = useRef<HTMLImageElement>(null);
  const cloud2Ref = useRef<HTMLImageElement>(null);
  const cloud3Ref = useRef<HTMLImageElement>(null);
  const cloud4Ref = useRef<HTMLImageElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Set initial states
      gsap.set(
        [
          titleRef.current,
          illustrationRef.current,
          arrowRef.current,
          phoneRef.current,
          dangerRef.current,
          descRef.current,
          buttonsRef.current,
        ],
        { y: 30 },
      );

      gsap.set(
        [
          cloud1Ref.current,
          cloud2Ref.current,
          cloud3Ref.current,
          cloud4Ref.current,
        ],
        { scale: 0.5 },
      );

      // Animate in sequence
      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.7 })
        .to(
          illustrationRef.current,
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.35",
        )
        .to(
          arrowRef.current,
          { opacity: 0.85, y: 0, duration: 0.5, x: isMobile ? "-25vw" : "0vw" },
          "-=0.25",
        )
        .to(phoneRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
        .to(
          dangerRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
          "-=0.2",
        )
        .to(descRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(
          [
            cloud1Ref.current,
            cloud2Ref.current,
            cloud3Ref.current,
            cloud4Ref.current,
          ],
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.6",
        );
    },
    {
      scope: heroRef,
      dependencies: [isMobile],
    },
  );

  return (
    <section className={styles.hero} ref={heroRef} id="hero">
      {/* Floating Clouds */}
      <div className={styles.cloudsContainer}>
        <img
          ref={cloud1Ref}
          src={Config.CDN_URL + "/images/cloud-1.webp"}
          alt=""
          className={`${styles.cloud} ${styles.cloud1}`}
        />
        <img
          ref={cloud2Ref}
          src={Config.CDN_URL + "/images/cloud-2.webp"}
          alt=""
          className={`${styles.cloud} ${styles.cloud2}`}
        />
        <img
          ref={cloud3Ref}
          src={Config.CDN_URL + "/images/cloud-3.webp"}
          alt=""
          className={`${styles.cloud} ${styles.cloud3}`}
        />
        <img
          ref={cloud4Ref}
          src={Config.CDN_URL + "/images/cloud-4.webp"}
          alt=""
          className={`${styles.cloud} ${styles.cloud4}`}
        />
      </div>

      {/* Hero Content */}
      <div className={styles.heroContent}>
        <div className={styles.heroInner}>
          {/* Left Section */}
          <div className={styles.heroLeft}>
            <h1 className={styles.heroTitle + " op-zero"} ref={titleRef}>
              Can I bunk today?
            </h1>

            <div
              className={styles.heroIllustration + " op-zero"}
              ref={illustrationRef}
            >
              <img
                src={Config.CDN_URL + "/images/sleeping-guy.webp"}
                alt="Student sleeping on desk with alarm clock and question marks"
                className={styles.sleepingGuy}
              />
            </div>

            <p className={styles.heroDescription + " op-zero"} ref={descRef}>
              BunkMate tells you when{"\n"}you can skip class{"\n"}without
              risking attendance.
            </p>

            {/* CTA Button */}
            <div className={styles.heroButtons + " op-zero"} ref={buttonsRef}>
              <a href="#download" className={styles.btnDownload}>
                <img
                  src={Config.CDN_URL + "/images/drawn-download-btn.webp"}
                  alt="Download App"
                  className={styles.btnDownloadImg}
                />
              </a>
            </div>
          </div>

          {/* Arrow */}
          <div className={styles.arrowContainer + " op-zero"} ref={arrowRef}>
            <img
              src={Config.CDN_URL + "/images/arrow.webp"}
              alt=""
              className={styles.arrowImg}
            />
          </div>

          {/* Right Section - Phone */}
          <div className={styles.heroRight}>
            <div className={styles.phoneContainer + " op-zero"} ref={phoneRef}>
              <img
                src={Config.CDN_URL + "/images/phone-img.webp"}
                alt="BunkMate app showing 75% attendance - Safe to bunk!"
                className={styles.phoneImg}
              />
              <img
                src={Config.CDN_URL + "/images/danger-zone.webp"}
                alt="Danger Zone!"
                className={styles.dangerBadge + " op-zero"}
                ref={dangerRef}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
