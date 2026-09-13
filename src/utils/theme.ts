import { useThemeStore } from "../store/themeStore";
import type { ThemeMode } from "../types/theme";

export function getInitialTheme(): ThemeMode {
  return useThemeStore.getState().theme;
}

export function applyTheme(theme: ThemeMode): void {
  useThemeStore.getState().setTheme(theme);
}

export function toggleTheme(coords?: { x: number; y: number }): Promise<void> {
  return useThemeStore.getState().toggleTheme(coords);
}
