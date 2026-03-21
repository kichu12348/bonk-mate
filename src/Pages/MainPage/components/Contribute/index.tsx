import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Contribute.module.css";
import Config from "@/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Contribute = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Header entrance
      tl.from(headerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        // Steps stagger in
        .from(
          [step1Ref.current, step2Ref.current, step3Ref.current],
          {
            x: -40,
            opacity: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.2",
        )
        // Laptop slides in from the right
        .from(
          laptopRef.current,
          {
            x: 60,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5",
        )
        // CTA fades up
        .from(
          ctaRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.2",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      className={styles.contributeSection}
      id="contribute"
      ref={sectionRef}
    >
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header} ref={headerRef}>
          <h2 className={styles.title}>
            Built by a student.
            <br />
            Open to students.
          </h2>
          <p className={styles.subtitle}>
            BunkMate is open source.
            <br />
            If it helped you, help it grow.
          </p>
        </div>

        {/* Steps + Laptop area */}
        <div className={styles.stepsArea}>
          {/* Step 1 — Star */}
          <div className={styles.step} ref={step1Ref}>
            <img
              src={Config.CDN_URL + "/images/star-1.webp"}
              alt=""
              className={styles.stepIcon}
            />
            <div className={styles.stepContent}>
              <span className={styles.stepTitle}>Star the Repository</span>
              <p className={styles.stepDesc}>
                If BunkMate saved your attendance once,
                <br />a star helps it reach more students.
              </p>
            </div>
          </div>

          {/* Step 2 — Fork */}
          <div className={styles.step} ref={step2Ref}>
            <img
              src={Config.CDN_URL + "/images/fork.webp"}
              alt=""
              className={styles.stepIcon}
            />
            <div className={styles.stepContent}>
              <span className={styles.stepTitle}>Fork &amp; Build</span>
              <p className={styles.stepDesc}>
                Want your own version?
                <br />
                Experiment. Improve.
                <br />
                Break things responsibly.
              </p>
            </div>
          </div>

          {/* Step 3 — Contribute */}
          <div className={styles.step} ref={step3Ref}>
            <img
              src={Config.CDN_URL + "/images/wrench.webp"}
              alt=""
              className={styles.stepIcon}
            />
            <div className={styles.stepContent}>
              <span className={styles.stepTitle}>Contribute</span>
              <p className={styles.stepDesc}>
                Fix bugs. Improve UI.
                <br />
                Make the bunking math even smarter.
              </p>
            </div>
          </div>

          {/* Laptop floating on the right */}
          <div className={styles.laptopWrapper} ref={laptopRef}>
            <img
              src={Config.CDN_URL + "/images/github-laptop.webp"}
              alt="GitHub on laptop"
              className={styles.laptopImg}
            />
            <img
              src={Config.CDN_URL + "/images/star-2.webp"}
              alt=""
              className={styles.starDeco}
            />
          </div>
        </div>

        {/* CTA */}
        <div className={styles.ctaArea} ref={ctaRef}>
          <a
            href={Config.GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            <img
              src={Config.CDN_URL + "/images/github-btn.webp"}
              alt="View on GitHub"
              className={styles.githubBtn}
            />
          </a>
          <p className={styles.tagline}>
            Stars don't cost attendance percentage.
          </p>
        </div>
      </div>
      <div className={styles.footer}>
        <p className={styles.footerText}>Made Wid</p> {/*heart svg*/}
        <span className={styles.heart}>
          <svg
            width="1.1rem"
            height="1.1rem"
            viewBox="-0.48 -0.48 16.96 16.96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="var(--accent-red)"
            strokeWidth="0.00016"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z"
                fill="var(--accent-red)"
              ></path>{" "}
            </g>
          </svg>
        </span>
        <p className={styles.footerText}>By Kichu</p>
      </div>
    </section>
  );
};

export default Contribute;
