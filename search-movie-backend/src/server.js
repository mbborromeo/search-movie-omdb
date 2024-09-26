const http = require("http");
const fetch = require("node-fetch");

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith("/searchMovie") && req.method === "GET") {
    try {
      let q = req.url.split("?"),
        result = {};
      if (q.length >= 2) {
        q[1].split("&").forEach((item) => {
          try {
            result[item.split("=")[0]] = item.split("=")[1];
          } catch (e) {
            result[item.split("=")[0]] = "";
          }
        });
      }
      if (result.title) {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        let omdbResponse = await fetch(
          "http://www.omdbapi.com/?" +
            new URLSearchParams(
              {
                apikey: "e425f00b", //FIXME: Put your OMDB API Key, https://www.omdbapi.com/apikey.aspx
                t: result.title,
              },
              requestOptions
            )
        );

        let omdbResponseJson = await omdbResponse.json();
        if (omdbResponse.status === 200) {
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
          res.setHeader("Access-Control-Max-Age", 2592000);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(omdbResponseJson));
        } else {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Something went wrong" }));
        }
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "No movie title provided!" }));
      }
    } catch (error) {
      console.error(error);
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
    }
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.end("Unsupported Route");
  }
});

server.listen(4000, () => {
  console.log(`Server is running`);
});
