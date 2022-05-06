const fetch = require("node-fetch");

async function setup() {
  //request for getting paths
  const response = await fetch("http://0.0.0.0:3000/api/id/revalidate/?id=5", {
    method: "GET",
  });
}

setup();
