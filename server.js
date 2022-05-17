const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = false;
const hostname = "0.0.0.0";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const fetch = require("node-fetch");

async function setup() {
  //request for getting paths
  const response = await fetch("http://0.0.0.0:3000/api/id/revalidate/?id=1", {
    method: "GET",
  });

  console.log("setup", response);
}

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
      // const { pathname, query } = parsedUrl;

      // if (pathname === "/a") {
      //   await app.render(req, res, "/a", query);
      // } else if (pathname === "/b") {
      //   await app.render(req, res, "/b", query);
      // } else {
      //   await handle(req, res, parsedUrl);
      // }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error", err);
    }
  }).listen(port, async (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
    await setup();
    console.log("setup complete");
    process.exit();
  });
});
