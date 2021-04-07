// Modules Import
const express = require("express"),
  app = express(),
  http = require("http"),
  logger = require("morgan"),
  db = require("./config/connection"),
  cors = require("cors"),
  helmet = require("helmet");

// Server Port Setting
const port = process.env.PORT || 3001;
app.set("port", port);

// Create Http Server
const server = http.createServer(app);

// Middilewares
app.use(
  helmet()
);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database Connetcion
db.connect((error) => {
  if (error) throw error;
  console.log("Database Connected");
});

// Routers

app.use("/user", require("./routers/user"));
app.use("/quiz", require("./routers/quiz"));
app.use("/score", require("./routers/score"));

// Server Listen
server.listen(port);
server.on("listening", () => {
  console.log(`Server is Running on ${port}`);
});
