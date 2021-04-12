const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");

const app = express();

// Middlwares
app.use(morgan("dev"));
// express.json is a middle substitute for bodyParser
app.use(express.json({ limit: "2mb" }));
app.use(cors());

// Route: loop all files in dir routes, import and use routes
fs.readdirSync("./src/routes").map((route) =>
  app.use("/api", require("./src/routes/" + route))
);

// Handle non-existing routes
app.all("*", (req, res, next) => {
  const err = new Error(`Server hasn't support ${req.originalUrl} yet!`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);
});

// Global error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
