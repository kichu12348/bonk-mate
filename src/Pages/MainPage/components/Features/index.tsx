import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Features.module.css";
import Config from "@/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ================================================================
   DATA — five features
   ================================================================ */
const FEATURES = [
  {
    number: "01",
    title: "Better Attendance UI",
    image: "/images/better-ui.webp",
    alt: "BunkMate clean attendance interface showing 82% overall percentage",
    paragraphs: [
      <>
        Most attendance apps feel like spreadsheets pretending to be software.{" "}
        <strong>BunkMate doesn't.</strong>
      </>,
      <>
        You get a clean, intuitive interface that makes checking your attendance
        feel <strong className={styles.highlight}>effortless</strong> — not like
        work.
      </>,
    ],
  },
  {
    number: "02",
    title: "Daily Course Attendance",
    image: "/images/daily-course-attendance.webp",
    alt: "Calendar view showing per-day attendance history per course",
    paragraphs: [
      <>
        Attendance isn't just a number.{" "}
        <strong className={styles.highlight}>It's a history.</strong>
      </>,
      <>
        BunkMate lets you view attendance per course, per day — so you always
        know{" "}
        <strong className={styles.highlightGreen}>what happened when</strong>.
      </>,
    ],
  },
  {
    number: "03",
    title: "Hourly Tracking",
    image: "/images/hourly-tracking.webp",
    alt: "Phone showing exact hours 9 AM, 10 AM, 11 AM, 1 PM attendance",
    paragraphs: [
      <>
        Ever wondered <strong className={styles.highlight}>"which hour"</strong>{" "}
        your attendance was marked? Now you don't have to.
      </>,
      <>
        BunkMate shows the{" "}
        <strong className={styles.highlight}>exact hours</strong> attendance was
        recorded, giving you{" "}
        <strong className={styles.highlightGreen}>complete transparency</strong>
        .
      </>,
    ],
  },
  {
    number: "04",
    title: "Manual Marking & Conflict Resolution",
    image: "/images/manual-marking.webp",
    alt: "Side-by-side YOURS vs OFFICIAL attendance clipboards",
    paragraphs: [
      <>
        Let's be real — teachers don't always update attendance on time. So
        BunkMate lets you mark attendance{" "}
        <strong className={styles.highlight}>temporarily</strong>.
      </>,
      <>
        When official records arrive, any mismatch is{" "}
        <strong className={styles.highlightRed}>flagged clearly</strong> so you
        can resolve it without stress.
      </>,
    ],
  },
  {
    number: "05",
    title: "Smart Conflict Detection",
    image: "/images/conflict.webp",
    alt: "Conflicting records between your marked and official attendance",
    paragraphs: [
      <>
        This is the <strong className={styles.highlight}>safety net</strong> of
        BunkMate.
      </>,
      <>
        It compares your manual marks with official records and highlights every{" "}
        <strong className={styles.highlightRed}>conflicting entry</strong> — so
        nothing slips through the cracks.
      </>,
    ],
  },
];

/* ================================================================
   WAVY SVG DIVIDER
   ================================================================ */
const WavyDivider = ({ svgRef }: { svgRef: React.Ref<SVGSVGElement> }) => (
  <svg
    ref={svgRef}
    className={styles.dividerSvg}
    viewBox="0 0 500 20"
    preserveAspectRatio="none"
  >
    <path
      className={styles.dividerPath}
      d="M0,10 C50,0 100,20 150,10 C200,0 250,20 300,10 C350,0 400,20 450,10 L500,10"
    />
  </svg>
);

/* ================================================================
   COMPONENT
   ================================================================ */
export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dividerRefs = useRef<(SVGSVGElement | null)[]>([]);
  const taglineRef = useRef<HTMLDivElement>(null);

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[i] = el;
  };

  const setDividerRef = (i: number) => (el: SVGSVGElement | null) => {
    dividerRefs.current[i] = el;
  };

  /* ============================================================
     GSAP — vertical scroll-triggered animations
     ============================================================ */
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      /* ---- header entrance ---- */
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      /* ---- per-card animations ---- */
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      cards.forEach((card, i) => {
        const img = card.querySelector("[data-img]") as HTMLElement | null;
        const texts = card.querySelectorAll<HTMLElement>("[data-text]");
        const num = card.querySelector("[data-num]") as HTMLElement | null;
        const titleEl = card.querySelector(
          "[data-title]",
        ) as HTMLElement | null;
        const accent = card.querySelector(
          "[data-accent]",
        ) as HTMLElement | null;

        const triggerConfig: ScrollTrigger.Vars = {
          trigger: card,
          start: "top 82%",
          toggleActions: "play none none reverse",
        };

        /* ---- unique animation per feature index ---- */
        switch (i) {
          /* -------------------------------------------------------
             FEATURE 1: "Unfold" — card scales up from a small
             point with a rotating perspective reveal
             ------------------------------------------------------- */
          case 0: {
            gsap.set(card, {
              opacity: 0,
              scale: 0.4,
              rotateY: -40,
              transformPerspective: 1200,
              transformOrigin: "left center",
            });

            gsap.to(card, {
              opacity: 1,
              scale: 1,
              rotateY: 0,
              duration: 1.2,
              ease: "expo.out",
              scrollTrigger: triggerConfig,
            });

            if (img) {
              gsap.fromTo(
                img,
                { clipPath: "circle(0% at 50% 50%)" },
                {
                  clipPath: "circle(75% at 50% 50%)",
                  duration: 1.4,
                  delay: 0.2,
                  ease: "power3.out",
                  scrollTrigger: triggerConfig,
                },
              );
            }
            break;
          }

          /* -------------------------------------------------------
             FEATURE 2: "Split & Merge" — image & text slide in
             from opposite edges and converge
             ------------------------------------------------------- */
          case 1: {
            if (img) {
              gsap.fromTo(
                img,
                { opacity: 0, x: -140, rotate: -15 },
                {
                  opacity: 1,
                  x: 0,
                  rotate: 0,
                  duration: 1,
                  ease: "back.out(1.4)",
                  scrollTrigger: triggerConfig,
                },
              );
            }

            texts.forEach((t, ti) => {
              gsap.fromTo(
                t,
                { opacity: 0, x: 100 + ti * 30, skewX: 8 },
                {
                  opacity: 1,
                  x: 0,
                  skewX: 0,
                  duration: 0.8,
                  delay: ti * 0.15,
                  ease: "power3.out",
                  scrollTrigger: triggerConfig,
                },
              );
            });
            break;
          }

          /* -------------------------------------------------------
             FEATURE 3: "Clock Tick" — image rotates in like a
             clock hand, text cascades with stagger + blur
             ------------------------------------------------------- */
          case 2: {
            if (img) {
              gsap.fromTo(
                img,
                {
                  opacity: 0,
                  rotate: -90,
                  scale: 0.6,
                  transformOrigin: "top right",
                },
                {
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                  duration: 1.3,
                  ease: "elastic.out(1, 0.6)",
                  scrollTrigger: triggerConfig,
                },
              );
            }

            texts.forEach((t, ti) => {
              gsap.fromTo(
                t,
                { opacity: 0, y: 50, filter: "blur(6px)" },
                {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 0.7,
                  delay: 0.3 + ti * 0.2,
                  ease: "power2.out",
                  scrollTrigger: triggerConfig,
                },
              );
            });
            break;
          }

          /* -------------------------------------------------------
             FEATURE 4: "Clipboard Flip" — entire card flips in
             from the top edge like a clipboard page turning
             ------------------------------------------------------- */
          case 3: {
            gsap.set(card, {
              opacity: 0,
              rotateX: -60,
              y: -80,
              transformPerspective: 900,
              transformOrigin: "top center",
            });

            gsap.to(card, {
              opacity: 1,
              rotateX: 0,
              y: 0,
              duration: 1.1,
              ease: "power4.out",
              scrollTrigger: triggerConfig,
            });

            if (img) {
              gsap.fromTo(
                img,
                { scale: 0.7, y: 30 },
                {
                  scale: 1,
                  y: 0,
                  duration: 0.9,
                  delay: 0.4,
                  ease: "back.out(2)",
                  scrollTrigger: triggerConfig,
                },
              );
            }
            break;
          }

          /* -------------------------------------------------------
             FEATURE 5: "Stamp Slam" — card slams in from large
             scale like a rubber stamp, then settles
             ------------------------------------------------------- */
          case 4: {
            gsap.set(card, {
              opacity: 0,
              scale: 2.5,
              filter: "blur(12px)",
            });

            gsap.to(card, {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power4.out",
              scrollTrigger: triggerConfig,
            });

            if (img) {
              gsap.fromTo(
                img,
                { rotate: 15, y: 40 },
                {
                  rotate: -2,
                  y: 0,
                  duration: 1,
                  delay: 0.3,
                  ease: "elastic.out(1.2, 0.5)",
                  scrollTrigger: triggerConfig,
                },
              );
            }
            break;
          }
        }

        /* ---- shared animations across all cards ---- */

        // Number fade-up
        if (num) {
          gsap.fromTo(
            num,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: triggerConfig,
            },
          );
        }

        // Title slide-in
        if (titleEl) {
          gsap.fromTo(
            titleEl,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              delay: 0.1,
              ease: "power3.out",
              scrollTrigger: triggerConfig,
            },
          );
        }

        // Accent underline draw
        if (accent) {
          gsap.fromTo(
            accent,
            { width: 0 },
            {
              width: "60%",
              duration: 0.8,
              delay: 0.5,
              ease: "power4.out",
              scrollTrigger: triggerConfig,
            },
          );
        }

        // Highlight sweep
        const hls = card.querySelectorAll<HTMLElement>(
          `.${styles.highlight}, .${styles.highlightGreen}, .${styles.highlightRed}`,
        );
        hls.forEach((hl) => {
          gsap.fromTo(
            hl,
            { backgroundSize: "0% 100%" },
            {
              backgroundSize: "100% 100%",
              duration: 0.6,
              delay: 0.7,
              ease: "power2.out",
              scrollTrigger: triggerConfig,
            },
          );
        });
      });

      /* ---- SVG divider draw-on ---- */
      dividerRefs.current.forEach((ref) => {
        if (!ref) return;
        const pathEl = ref.querySelector("path");
        if (!pathEl) return;

        const length = pathEl.getTotalLength();
        gsap.set(pathEl, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(pathEl, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ref,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      /* ---- bottom tagline ---- */
      if (taglineRef.current) {
        gsap.fromTo(
          taglineRef.current,
          { opacity: 0, scale: 0.8, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: taglineRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section className={styles.features} ref={sectionRef} id="features">
      {/* Floating clouds */}
      <img
        src={Config.CDN_URL + "/images/cloud-1.webp"}
        alt=""
        className={`${styles.cloudDeco} ${styles.cloud1}`}
      />
      <img
        src={Config.CDN_URL + "/images/cloud-2.webp"}
        alt=""
        className={`${styles.cloudDeco} ${styles.cloud2}`}
      />

      {/* Section Header */}
      <div className={styles.sectionHeader} ref={headerRef}>
        <h2 className={styles.sectionTitle}>
          <img
            src={Config.CDN_URL + "/images/alarm.webp"}
            alt=""
            className={styles.sectionTitleIcon}
          />
          What BunkMate actually does
        </h2>
        <p className={styles.sectionSubtitle}>
          No boxes. No tiles. Just features, explained the way a human would.
        </p>
      </div>

      {/* Vertical Feature Cards */}
      <div className={styles.cardsContainer}>
        {FEATURES.map((feat, i) => (
          <div key={i}>
            <div
              className={`${styles.card} ${i % 2 !== 0 ? styles.cardReverse : ""}`}
              ref={setCardRef(i)}
            >
              {/* Text Side */}
              <div className={styles.textSide}>
                <div className={styles.featureNumber} data-num>
                  {feat.number}
                </div>
                <h3 className={styles.featureTitle} data-title>
                  {feat.title}
                  <span className={styles.titleAccent} data-accent />
                </h3>
                {feat.paragraphs.map((para, pi) => (
                  <p key={pi} className={styles.featureDesc} data-text>
                    {para}
                  </p>
                ))}
              </div>

              {/* Image Side */}
              <div className={styles.imageSide}>
                <div className={styles.imageBg} />
                <img
                  src={Config.CDN_URL + feat.image}
                  alt={feat.alt}
                  className={styles.featureImage}
                  data-img
                />
              </div>
            </div>

            {/* Wavy divider between cards (not after the last one) */}
            {i < FEATURES.length - 1 && (
              <WavyDivider svgRef={setDividerRef(i)} />
            )}
          </div>
        ))}
      </div>

      {/* Bottom Tagline */}
      <div className={styles.bottomTagline} ref={taglineRef}>
        <p className={styles.taglineText}>
          BunkMate isn't about skipping more classes.
          <br />
          <strong>It's about skipping smarter.</strong>
        </p>
      </div>
    </section>
  );
}
