const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env.local" });
const app = require("./app");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true, //fix some warnings
  })
  .then(() => {
    console.log("DB CONNECTED SUCCESSFULLY!");
  })
  .catch((err) => console.log(`DB CONNECTION ERR ${err}`));

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});

// Set server on close
const originalClose = server.close.bind(server);
server.close = () => {
  return new Promise((resolveClose) => {
    originalClose(resolveClose);
  });
};

setupCloseOnExit(server);

// Set callback function when server exits
function setupCloseOnExit(server) {
  async function exitHandler(options = {}) {
    await server
      .close()
      .then(() => {
        console.log("Server successfully closed");
      })
      .catch((e) => {
        console.log("Something went wrong closing the server", e.stack);
      });
    if (options.exit) process.exit();
  }
  // do something when app is closing
  process.on("exit", exitHandler);
  // catches ctrl+c event
  process.on("SIGINT", exitHandler.bind(null, { exit: true }));
  // catches "kill pid" (for example: nodemon restart)
  process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
  process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));
  // catches uncaught exceptions
  process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
}
server.on("error", onError);

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
