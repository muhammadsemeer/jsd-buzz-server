// Modules Import
const express = require("express"),
  app = express(),
  http = require("http"),
  logger = require("morgan");

// Server Port Setting
const port = process.env.PORT || 3001;
app.set("port", port);

// Create Http Server
const server = http.createServer(app);

// Middilewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Server Listen
server.listen(port);
server.on("listening", () => {
  console.log(`Server is Running on ${port}`);
});
