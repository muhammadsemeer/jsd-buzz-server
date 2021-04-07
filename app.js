// Modules Import
const express = require("express"),
  app = express(),
  http = require("http"),
  logger = require("morgan"),
  db = require("./config/connection");

// Server Port Setting
const port = process.env.PORT || 3001;
app.set("port", port);

// Create Http Server
const server = http.createServer(app);

// Middilewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database Connetcion
db.connect((error) => {
  if (error) throw error;
  console.log("Database Connected");
});

// Server Listen
server.listen(port);
server.on("listening", () => {
  console.log(`Server is Running on ${port}`);
});
