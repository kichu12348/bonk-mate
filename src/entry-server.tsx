import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";

function extractPreloads(html: string) {
  const links: string[] = [];

  const cleaned = html.replace(/<link[^>]+rel="preload"[^>]*>/g, (match) => {
    links.push(match);
    return "";
  });

  return { body: cleaned, links };
}

export function render(url: string) {
  const html = renderToString(
    <StaticRouter location={url}>
      <StrictMode>
        <App />
      </StrictMode>
    </StaticRouter>,
  );

  return extractPreloads(html);
}
