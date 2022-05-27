const express = require("express");
const cors = require('cors');
const logger = require("morgan");
const config = require("./app/config/config");
const bodyParser = require("body-parser");


const app = express();
/* Enable developer logs */
app.use(logger("dev"));

require("./app/config/mongoose"); //initializing mongoose

/* Enable CORS*/
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Origin", req.headers['origin']);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token,authorization,Content-Type,Access-Control-Request-Headers,enctype,system"
  );
  
  console.log("method type", req.method);
  if (req.method === "OPTIONS") {
    console.log("going to options");
    res.status(200);
    res.end();
  } else {
    next();
  }
});

/* Initialize body parser */
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

/* Intializing routes */

let allowedUrls = ['/users/login', '/users/authenticate', '/users/get-permission', '/users/get-base-permissions', '/users/parse-bitarray']

app.use("/api/", require("./app/routes"));

app.use((error, req, res, next) => {
  console.log("err", error);
  if (error.isBoom) {
    console.log("error", error);
    let obj = error.output.payload;
    if (error.data.length && error.data[0]) {
      obj.msg = error.data[0].message;
      obj.path = error.data[0].path;
      obj.err = obj.message;
      delete obj.message;
      delete obj.error;
    }

    return res.status(error.output.statusCode).json(obj);
  }
  res.status(error.status || 500);
  res.json({ success: false, data: null, msg: "Request is not processing" });
});

app.listen(config.port);
console.log(
  `Server started on port :${config.port} with ${process.env.NODE_ENV}  mode `
);

module.exports = app;
