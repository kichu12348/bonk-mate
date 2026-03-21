import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const cssPlugin = () => {
    return {
      name: "css-transform",
      enforce: "pre",
      transform(code: string, id: string) {
        if (id.endsWith(".css")) {
          return {
            code: code.replace(
              "_BG_URL_",
              (env["VITE_PUBLIC_CDN_URL"] ?? "") + "/images/bunk-bg-2.webp",
            ),
          };
        }
      },
    };
  };

  return {
    plugins: [react(), cssPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (
              id.includes("node_modules/react") ||
              id.includes("node_modules/react-dom") ||
              id.includes("node_modules/react-router-dom")
            ) {
              return "react";
            } else if (id.includes("node_modules/jspdf")) {
              return "pdf";
            } else if (
              id.includes("node_modules/gsap") ||
              id.includes("node_modules/@gsap/react")
            ) {
              return "animation";
            } else if (id.includes("node_modules/lz-string")) {
              return "compression";
            }
          },
        },
      },
    },
  };
});
