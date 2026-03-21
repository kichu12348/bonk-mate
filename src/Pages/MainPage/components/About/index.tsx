import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./About.module.css";
import Config from "@/constants";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Refs for animated elements
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const introImageRef = useRef<HTMLDivElement>(null);
  const soIdidRef = useRef<HTMLDivElement>(null);
  const whyTitleRef = useRef<HTMLDivElement>(null);
  const whyLinesRef = useRef<HTMLDivElement>(null);
  const doesTitleRef = useRef<HTMLHeadingElement>(null);
  const checkItemsRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const honestTitleRef = useRef<HTMLDivElement>(null);
  const honestTextRef = useRef<HTMLDivElement>(null);
  const realityRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const divider1Ref = useRef<SVGSVGElement>(null);
  const divider2Ref = useRef<SVGSVGElement>(null);
  const divider3Ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      // ============================================================
      // HELPER: Create a ScrollTrigger animation
      // ============================================================
      const scrollAnim = (
        target: gsap.TweenTarget,
        fromVars: gsap.TweenVars,
        toVars: gsap.TweenVars,
        triggerEl?: Element | null,
        startOffset = "top 85%",
      ) => {
        gsap.fromTo(target, fromVars, {
          ...toVars,
          scrollTrigger: {
            trigger: (triggerEl || target) as Element,
            start: startOffset,
            toggleActions: "play none none reverse",
          },
        });
      };

      // ============================================================
      // 1. TITLE — 3D flip-in with a rubber-band settle
      // ============================================================
      if (titleRef.current) {
        gsap.set(titleRef.current, {
          opacity: 0,
          rotateX: 90,
          y: -60,
          transformPerspective: 800,
          transformOrigin: "center bottom",
        });

        gsap.to(titleRef.current, {
          opacity: 1,
          rotateX: 0,
          y: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.4)",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        // Underline draws itself in
        const underline = titleRef.current.querySelector(
          `.${styles.titleUnderline}`,
        );
        if (underline) {
          gsap.fromTo(
            underline,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              delay: 0.6,
              ease: "power4.out",
              scrollTrigger: {
                trigger: titleRef.current,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      }

      // ============================================================
      // 2. INTRO TEXT — words stagger-blur-in from different angles
      // ============================================================
      if (introTextRef.current) {
        const lines =
          introTextRef.current.querySelectorAll<HTMLElement>("[data-line]");
        lines.forEach((line, i) => {
          const direction = i % 2 === 0 ? -1 : 1;
          gsap.fromTo(
            line,
            {
              opacity: 0,
              x: direction * 80,
              filter: "blur(8px)",
              rotateZ: direction * 4,
            },
            {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              rotateZ: 0,
              duration: 0.9,
              delay: i * 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: introTextRef.current,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      }

      // ============================================================
      // 3. INTRO IMAGE — scale-up with elastic + spin-wobble
      // ============================================================
      if (introImageRef.current) {
        gsap.fromTo(
          introImageRef.current,
          {
            opacity: 0,
            scale: 0.3,
            rotate: -12,
            y: 60,
          },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            y: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: introImageRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // ============================================================
      // 4. "So I did" — typewriter-style reveal with cursor blink
      // ============================================================
      if (soIdidRef.current) {
        const words =
          soIdidRef.current.querySelectorAll<HTMLElement>("[data-word]");
        gsap.set(words, { opacity: 0, y: 20, scale: 0.8 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: soIdidRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        words.forEach((word, i) => {
          tl.to(
            word,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "back.out(2)",
            },
            i * 0.12,
          );
        });
      }

      // ============================================================
      // 5. SVG DIVIDER LINES — draw-on effect
      // ============================================================
      [divider1Ref, divider2Ref, divider3Ref].forEach((ref) => {
        if (!ref.current) return;
        const pathEl = ref.current.querySelector("path");
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
            trigger: ref.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // ============================================================
      // 6. WHY EXISTS — title + alarm icon slam-in
      // ============================================================
      if (whyTitleRef.current) {
        const icon = whyTitleRef.current.querySelector("img");
        const text = whyTitleRef.current.querySelector("span");

        if (icon) {
          gsap.fromTo(
            icon,
            { opacity: 0, scale: 0, rotate: -180 },
            {
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.9,
              ease: "elastic.out(1.2, 0.4)",
              scrollTrigger: {
                trigger: whyTitleRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, x: -60, skewX: -10 },
            {
              opacity: 1,
              x: 0,
              skewX: 0,
              duration: 0.8,
              delay: 0.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: whyTitleRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      }

      // ============================================================
      // 7. WHY LINES — stagger reveal with parallax depth
      // ============================================================
      if (whyLinesRef.current) {
        const lines =
          whyLinesRef.current.querySelectorAll<HTMLElement>("[data-why-line]");
        lines.forEach((line, i) => {
          gsap.fromTo(
            line,
            {
              opacity: 0,
              x: -50,
              y: 20,
              filter: "blur(4px)",
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              filter: "blur(0px)",
              duration: 0.7,
              delay: i * 0.2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: whyLinesRef.current,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            },
          );

          // highlight words pop after the line appears
          const highlights = line.querySelectorAll<HTMLElement>(
            `.${styles.highlight}, .${styles.highlightRed}`,
          );
          highlights.forEach((hl) => {
            gsap.fromTo(
              hl,
              { backgroundSize: "0% 100%" },
              {
                backgroundSize: "100% 100%",
                duration: 0.6,
                delay: i * 0.2 + 0.5,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: whyLinesRef.current,
                  start: "top 82%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          });
        });
      }

      // ============================================================
      // 8. "BunkMate does." TITLE — bounce in from bottom
      // ============================================================
      if (doesTitleRef.current) {
        scrollAnim(
          doesTitleRef.current,
          { opacity: 0, y: 60, scale: 0.7 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.7)",
          },
        );
      }

      // ============================================================
      // 9. CHECK ITEMS — sequential reveal with check-mark pop
      // ============================================================
      if (checkItemsRef.current) {
        const items =
          checkItemsRef.current.querySelectorAll<HTMLElement>(
            "[data-check-item]",
          );
        items.forEach((item, i) => {
          const mark = item.querySelector(`.${styles.checkMark}`);
          const text = item.querySelector("span");

          gsap.fromTo(
            item,
            { opacity: 0, x: -40, y: 15 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.6,
              delay: i * 0.25,
              ease: "power3.out",
              scrollTrigger: {
                trigger: checkItemsRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );

          // checkmark pops with elastic
          if (mark) {
            gsap.fromTo(
              mark,
              { scale: 0, rotate: -90 },
              {
                scale: 1,
                rotate: 0,
                duration: 0.5,
                delay: i * 0.25 + 0.3,
                ease: "elastic.out(1.5, 0.5)",
                scrollTrigger: {
                  trigger: checkItemsRef.current,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }

          // text highlight sweeps in after
          if (text) {
            const hls = text.querySelectorAll<HTMLElement>(
              `.${styles.highlight}`,
            );
            hls.forEach((hl) => {
              gsap.fromTo(
                hl,
                { backgroundSize: "0% 100%" },
                {
                  backgroundSize: "100% 100%",
                  duration: 0.5,
                  delay: i * 0.25 + 0.5,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: checkItemsRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                  },
                },
              );
            });
          }
        });
      }

      // ============================================================
      // 10. PHONE — slides in from the right with depth rotation
      // ============================================================
      if (phoneRef.current) {
        gsap.fromTo(
          phoneRef.current,
          {
            opacity: 0,
            x: 120,
            rotateY: -25,
            transformPerspective: 600,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: phoneRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // ============================================================
      // 11. HONEST PART — title + alarm icon
      // ============================================================
      if (honestTitleRef.current) {
        const icon = honestTitleRef.current.querySelector("img");
        const text = honestTitleRef.current.querySelector("span");

        if (icon) {
          // Alarm shakes in
          gsap.fromTo(
            icon,
            { opacity: 0, scale: 0, rotate: 30 },
            {
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.8,
              ease: "elastic.out(1.2, 0.35)",
              scrollTrigger: {
                trigger: honestTitleRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );

          // continuous subtle ring
          gsap.to(icon, {
            rotate: "+=6",
            yoyo: true,
            repeat: -1,
            duration: 0.15,
            ease: "power1.inOut",
            delay: 1,
            scrollTrigger: {
              trigger: honestTitleRef.current,
              start: "top 85%",
              toggleActions: "play pause resume pause",
            },
          });
        }

        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, x: -50, skewX: -8 },
            {
              opacity: 1,
              x: 0,
              skewX: 0,
              duration: 0.8,
              delay: 0.25,
              ease: "power3.out",
              scrollTrigger: {
                trigger: honestTitleRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      }

      // ============================================================
      // 12. HONEST TEXT LINES — cascade with gentle wave
      // ============================================================
      if (honestTextRef.current) {
        const paras =
          honestTextRef.current.querySelectorAll<HTMLElement>("[data-h-line]");
        paras.forEach((p, i) => {
          gsap.fromTo(
            p,
            {
              opacity: 0,
              y: 30,
              x: i % 2 === 0 ? -30 : 30,
              filter: "blur(3px)",
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              filter: "blur(0px)",
              duration: 0.7,
              delay: i * 0.18,
              ease: "power2.out",
              scrollTrigger: {
                trigger: honestTextRef.current,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      }

      // ============================================================
      // 13. REALITY LINE — stamp / slam effect
      // ============================================================
      if (realityRef.current) {
        gsap.fromTo(
          realityRef.current,
          { opacity: 0, scale: 2, rotate: -8 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.6,
            ease: "back.out(3)",
            scrollTrigger: {
              trigger: realityRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // ============================================================
      // 14. TAGLINE IMAGE — cinematic scale + reveal
      // ============================================================
      if (taglineRef.current) {
        gsap.fromTo(
          taglineRef.current,
          {
            opacity: 0,
            scale: 0.6,
            y: 60,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: taglineRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  // ============================================================
  // WAVY SVG DIVIDER helper
  // ============================================================
  const WavyDivider = ({
    svgRef,
  }: {
    svgRef: React.RefObject<SVGSVGElement | null>;
  }) => (
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

  return (
    <section className={styles.about} ref={sectionRef} id="about">
      {/* Floating Decorative Clouds */}
      <img
        src={Config.CDN_URL + "/images/cloud-1.webp"}
        alt=""
        className={`${styles.cloudDeco} ${styles.cloudDeco1}`}
      />
      <img
        src={Config.CDN_URL + "/images/cloud-2.webp"}
        alt=""
        className={`${styles.cloudDeco} ${styles.cloudDeco2}`}
      />
      <img
        src={Config.CDN_URL + "/images/cloud-3.webp"}
        alt=""
        className={`${styles.cloudDeco} ${styles.cloudDeco3}`}
      />

      <div className={styles.aboutInner}>
        {/* ===== TITLE ===== */}
        <h2 className={styles.storyTitle} ref={titleRef}>
          The Story Behind BunkMate
          <span className={styles.titleUnderline} />
        </h2>

        {/* ===== INTRO ===== */}
        <div className={`${styles.storyBlock} ${styles.introBlock}`}>
          <div ref={introTextRef}>
            <p className={styles.introText} data-line>
              It started the same way it starts for every student.
            </p>
            <p className={styles.introText} data-line>
              A college attendance portal.
            </p>
            <p className={styles.introText} data-line>
              Outdated. Confusing.
            </p>
            <p className={styles.introText} data-line>
              Updating once in a blue moon.
            </p>
          </div>

          <div className={styles.introImageWrapper} ref={introImageRef}>
            <img
              src={Config.CDN_URL + "/images/sys-why-no-me.webp"}
              alt='"This system sucks... why not build my own?"'
              className={styles.introImage}
            />
          </div>
        </div>

        {/* ===== "So I did." ===== */}
        <div
          className={`${styles.storyBlock} ${styles.soIdidBlock}`}
          ref={soIdidRef}
        >
          <p className={styles.soIdid}>
            <span data-word>So</span> <span data-word>I</span>{" "}
            <span data-word>did.</span> <span data-word>That</span>{" "}
            <span data-word>idea</span> <span data-word>became</span>{" "}
            <span data-word>
              <strong>BunkMate</strong>
            </span>{" "}
            <span data-word>—</span> <br />
            <span data-word>
              <em>an app made by a hooman, for hoomans.</em>
            </span>
          </p>
        </div>

        <WavyDivider svgRef={divider1Ref} />

        {/* ===== WHY BUNKMATE EXISTS ===== */}
        <div className={`${styles.storyBlock} ${styles.whyBlock}`}>
          <div className={styles.blockTitle} ref={whyTitleRef}>
            <img
              src={Config.CDN_URL + "/images/alarm.webp"}
              alt=""
              className={styles.blockTitleIcon}
            />
            <span>Why BunkMate Exists</span>
          </div>
          <div ref={whyLinesRef}>
            <p className={styles.whyText} data-why-line>
              Most college systems don't care about{" "}
              <strong className={styles.highlight}>when</strong> attendance is
              updated.
            </p>
            <p className={styles.whyText} data-why-line>
              They don't care about panic at{" "}
              <strong className={styles.highlightRed}>74.9%</strong>.
            </p>
            <p className={styles.whyText} data-why-line>
              They definitely don't care about mental math at{" "}
              <strong className={styles.highlight}>2 AM</strong>.
            </p>
          </div>
        </div>

        <WavyDivider svgRef={divider2Ref} />

        {/* ===== BUNKMATE DOES ===== */}
        <div className={`${styles.storyBlock} ${styles.doesBlock}`}>
          <div className={styles.doesLeft}>
            <h3 className={styles.doesTitle} ref={doesTitleRef}>
              BunkMate does.
            </h3>
            <div className={styles.checkList} ref={checkItemsRef}>
              <div className={styles.checkItem} data-check-item>
                <span className={styles.checkMark}>✔</span>
                <span>
                  track attendance in{" "}
                  <strong className={styles.highlight}>real time</strong>
                </span>
              </div>
              <div className={styles.checkItem} data-check-item>
                <span className={styles.checkMark}>✔</span>
                <span>
                  know exactly how many classes you can{" "}
                  <strong className={styles.highlight}>safely bunk</strong>
                </span>
              </div>
              <div className={styles.checkItem} data-check-item>
                <span className={styles.checkMark}>✔</span>
                <span>
                  calculate how many you need to{" "}
                  <strong className={styles.highlight}>
                    attend to recover
                  </strong>
                </span>
              </div>
            </div>
          </div>
          <div className={styles.doesRight} ref={phoneRef}>
            <img
              src={Config.CDN_URL + "/images/phone-img.webp"}
              alt="BunkMate app showing 75% attendance — Safe to bunk!"
              className={styles.phonePreview}
            />
          </div>
        </div>

        <WavyDivider svgRef={divider3Ref} />

        {/* ===== THE HONEST PART ===== */}
        <div className={`${styles.storyBlock} ${styles.honestBlock}`}>
          <div className={styles.blockTitle} ref={honestTitleRef}>
            <img
              src={Config.CDN_URL + "/images/alarm.webp"}
              alt=""
              className={styles.blockTitleIcon}
            />
            <span>The Honest Part</span>
          </div>
          <div ref={honestTextRef}>
            <p className={styles.honestText} data-h-line>
              Teachers don't always update attendance regularly.
            </p>
            <p className={styles.honestText} data-h-line>
              So BunkMate lets you mark attendance{" "}
              <strong className={styles.highlight}>temporarily</strong> — and{" "}
              <strong className={styles.highlight}>resolve</strong> conflicts
              cleanly once official data comes in.
            </p>
          </div>
          <p className={styles.realityLine} ref={realityRef}>
            Because students deserve tools that understand{" "}
            <strong>reality.</strong>
          </p>
        </div>

        {/* ===== TAGLINE ===== */}
        <div
          className={`${styles.storyBlock} ${styles.taglineBlock}`}
          ref={taglineRef}
        >
          <img
            src={Config.CDN_URL + "/images/tagline-story.webp"}
            alt="Bunk responsibly. Graduate safely."
            className={styles.taglineImage}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
