/// calls the render function
import { readFile, writeFile } from "fs/promises";

async function prerender() {
  try {
    const { render } = await import("../dist/server/entry-server.js");
    const appHtml = render();

    const indexHtml = await readFile("./dist/static/index.html", "utf-8");

    const html = indexHtml.replace(
      '<div id="root"></div>',
      `<div id=\"root\">${appHtml}</div>`,
    );
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
