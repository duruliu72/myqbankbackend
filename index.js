const config = require("config");
var cors = require("cors");
const connect = require("./startup/connect");
const express = require("express");
const app = express();

app.use(cors());
require("./startup/routes")(app);

const port = process.env.PORT || config.get("port");
const dbUrl = config.get("db");
connect(dbUrl)
  .then((connection) => {
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
      console.log(`Connected to ${dbUrl}...`);
    });
  })
  .catch((e) => console.error(e));
