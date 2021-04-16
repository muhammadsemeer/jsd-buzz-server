// Modules Import
const express = require("express"),
  app = express(),
  http = require("http"),
  logger = require("morgan"),
  db = require("./config/connection"),
  cors = require("cors"),
  helmet = require("helmet"),
  cookieParser = require("cookie-parser");

// Server Port Setting
const port = process.env.PORT || 3001;
app.set("port", port);

// Create Http Server
const server = http.createServer(app);

// Middilewares
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Database Connetcion
db.connect((error) => {
  if (error) throw error;
  console.log("Database Connected");
});

// Routers

app.use("/quiz", require("./routers/quiz"));
app.use("/auth", require("./routers/auth"));
app.use("/leaderboard", require("./routers/leaderboard"));

// Server Listen
server.listen(port);
server.on("listening", () => {
  console.log(`Server is Running on ${port}`);
});
