import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p: string) => path.resolve(__dirname, p);

const routesToPrerender: string[] = ["/", "/pdf"];

async function prerender() {
  const nowStart = new Date() as any;

  const template = fs.readFileSync(
    toAbsolute("dist/static/index.html"),
    "utf-8",
  );

  const start = new Date() as any;
  const { render } = await import(toAbsolute("dist/server/entry-server.js"));

  const endStart = new Date() as any;

  console.log(`Server loaded in ${endStart - start}ms`);

  for (const route of routesToPrerender) {
    const now = new Date() as any;

    const { body, links } = render(route);
    const html = template
      .replace("<!--app-->", body)
      .replace("<!--app-head-->", links.join(""))
      .replace(/\n/g, "")
      .replace(/\s+/g, " ");
    const filePath = toAbsolute(
      `dist/static${route === "/" ? "/index" : route}.html`,
    );
    fs.writeFileSync(filePath, html);

    const end = new Date() as any;
    console.log(`Route ${route} generated in ${end - now}ms`);
  }

  const nowEnd = new Date() as any;
  console.log("\x1b[32m%s\x1b[0m", `Total time taken: ${nowEnd - nowStart}ms`);
}

prerender()
  .then(() => {
    // in green color in the console
    console.log("\x1b[32m%s\x1b[0m", "Static pages generated successfully!");
  })
  .catch((err) => {
    console.error(
      "\x1b[31m%s\x1b[0m",
      "Error during static page generation:",
      err,
    );
  });
