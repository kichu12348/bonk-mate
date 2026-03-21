import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Navbar.module.css";
import Config from "@/constants";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Download", href: "#download" },
  { label: "Contribute", href: "#contribute" },
];

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const mobileLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Track scroll position for glassmorphism effect
  useEffect(() => {
    const onScroll = () => {
      const scrolled = Math.min(window.scrollY / 60, 1);
      const elem = navRef.current;
      if (elem) {
        elem.style.setProperty("--scrolled-dist", scrolled.toString());
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Animate mobile menu links with stagger
  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        mobileLinksRef.current.filter(Boolean),
        { opacity: 0, x: -30, rotate: -2 },
        {
          opacity: 1,
          x: 0,
          rotate: 0,
          duration: 0.45,
          stagger: 0.07,
          ease: "back.out(1.2)",
          delay: 0.15,
        },
      );
    }
  }, [menuOpen]);

  // GSAP entrance animation
  useGSAP(
    () => {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.1 },
      );
    },
    { scope: navRef },
  );

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`${styles.navbar} ${styles.scrolled} op-zero`}
        id="main-navbar"
      >
        <div className={styles.navInner}>
          {/* Logo */}
          <a href="#hero" className={styles.logo}>
            <img
              src={Config.CDN_URL + "/images/bonk-icon.webp"}
              alt="Bonk Mate logo"
            />
          </a>

          {/* Desktop Links */}
          <div className={styles.navLinks}>
            {navItems.map((item, i) => (
              <span key={item.href} className={styles.navLinkWrapper}>
                {i > 0 && <span className={styles.navSeparator}>|</span>}
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </span>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`${styles.menuBtn} ${menuOpen ? styles.open : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className={styles.menuLine}></span>
            <span className={styles.menuLine}></span>
            <span className={styles.menuLine}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu — Notebook Style Overlay */}
      <div className={`${styles.mobileOverlay} ${menuOpen ? styles.open : ""}`}>
        {/* Notebook ruled lines */}
        <div className={styles.notebookLines}></div>

        {/* Doodle decorations */}
        <div className={`${styles.overlayDoodle} ${styles.doodleStar}`}>✦</div>
        <div className={`${styles.overlayDoodle} ${styles.doodleCircle}`}></div>
        <div className={`${styles.overlayDoodle} ${styles.doodleZigzag}`}></div>

        {/* Logo */}
        <div className={styles.overlayLogo}>
          <img
            src={Config.CDN_URL + "/images/bonk-icon.webp"}
            alt="Bonk Mate"
          />
        </div>

        {/* Nav links */}
        <div className={styles.overlayNav}>
          {navItems.map((item, i) => (
            <a
              key={item.href}
              ref={(el) => {
                mobileLinksRef.current[i] = el;
              }}
              href={item.href}
              className={styles.overlayLink}
              onClick={handleLinkClick}
              style={{ opacity: 0 }}
            >
              <span className={styles.overlayLinkIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.overlayLinkLabel}>{item.label}</span>
              <span className={styles.overlayLinkArrow}>→</span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.overlayFooter}>
          <span>~ bonk mate ~</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
