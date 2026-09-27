/// calls the render function
import { readFile, writeFile } from "node:fs/promises";

const LINK_REGEX = /<link\b[^>]*>/gi;

async function prerender() {
  try {
    const { render } = await import("../dist/server/entry-server.js");
    const appHtml = render();

    const linkTags = appHtml.match(LINK_REGEX) || [];

    const indexHtml = await readFile("./dist/static/index.html", "utf-8");

    const html = indexHtml
      .replace(
        '<div id="root"></div>',
        `<div id=\"root\">${appHtml.replace(LINK_REGEX, "").trim()}</div>`,
      )
      .replace("<!--app-head-->", linkTags.join(""));

    await writeFile("./dist/static/index.html", html);

    //GREEN COLOR
    console.log("\x1b[32mBuild successful!");
    //close green color
    console.log("\x1b[0m");
  } catch (e) {
    //RED COLOR
    console.log("\x1b[31mBuild failed!"); //close red color
    console.log("\x1b[0m");
    console.log(e);
    process.exit(1);
  }
}
prerender();
