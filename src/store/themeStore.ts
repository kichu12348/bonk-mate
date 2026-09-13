import { create } from "zustand";
import { persist } from "zustand/middleware";
import { flushSync } from "react-dom";
import type { ThemeMode } from "../types/theme";

export interface Coordinates {
  x: number;
  y: number;
}

interface ThemeState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: (coords?: Coordinates) => Promise<void>;
}

// Detect initial theme from localStorage or document attribute
function getInitialTheme(): ThemeMode {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("bunkmate-theme");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed?.state?.theme === "dark" || parsed?.state?.theme === "light") {
          return parsed.state.theme;
        }
      }
    } catch {
      // Fallback if parsing fails
    }
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") {
      return attr;
    }
  }
  return "dark";
}

let isTransitioning = false;

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: getInitialTheme(),

      setTheme: (theme: ThemeMode) => {
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("data-theme", theme);
        }
        set({ theme });
      },

      toggleTheme: async (coords?: Coordinates) => {
        // Prevent concurrent transitions
        if (isTransitioning) return;

        const current = get().theme;
        const next: ThemeMode = current === "dark" ? "light" : "dark";

        // Check for View Transitions API support and user motion preference
        const doc = document as unknown as {
          startViewTransition?: (cb: () => void | Promise<void>) => {
            ready: Promise<void>;
            finished: Promise<void>;
            skipTransition: () => void;
          };
        };

        const supportsViewTransition =
          typeof document !== "undefined" &&
          typeof doc.startViewTransition === "function" &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Fallback for browsers without View Transitions or when reduced motion is preferred
        if (!supportsViewTransition) {
          if (typeof document !== "undefined") {
            document.documentElement.setAttribute("data-theme", next);
          }
          set({ theme: next });
          return;
        }

        isTransitioning = true;

        const x = coords?.x ?? window.innerWidth / 2;
        const y = coords?.y ?? window.innerHeight / 2;

        // Calculate radius to the farthest viewport corner
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );

        // Temporarily disable standard CSS transition properties so the snapshot is crisp and instantaneous
        document.documentElement.classList.add("theme-transitioning");

        try {
          const transition = doc.startViewTransition!(() => {
            flushSync(() => {
              set({ theme: next });
            });
            document.documentElement.setAttribute("data-theme", next);
          });

          await transition.ready;

          // Telegram-style expanding circular clip-path animation
          const animation = document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 480,
              easing: "cubic-bezier(0.4, 0, 0.2, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );

          await animation.finished;
        } catch {
          // In case animation errors or is interrupted, ensure theme is still set
          document.documentElement.setAttribute("data-theme", next);
          set({ theme: next });
        } finally {
          document.documentElement.classList.remove("theme-transitioning");
          isTransitioning = false;
        }
      },
    }),
    {
      name: "bunkmate-theme",
      onRehydrateStorage: () => (state) => {
        if (state?.theme && typeof document !== "undefined") {
          document.documentElement.setAttribute("data-theme", state.theme);
        }
      },
    }
  )
);
