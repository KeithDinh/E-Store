const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config({ path: "./.env.local" });

const app = express();

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

// middlwares
app.use(morgan("dev"));
// express.json is a middle substitute for bodyParser
app.use(express.json({ limit: "2mb" }));
app.use(cors());

// route middlewares
// loop through each file in dir routes, import then used as route middleware
fs.readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
