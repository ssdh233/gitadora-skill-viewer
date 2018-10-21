const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const compression = require("compression");

const React = require("react");
import { Helmet } from "react-helmet";
import serverSideRendering from "./src/server";

app.use(compression());

app.use(express.static("src/public"));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/src/views"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser());

// for express endpoints.
let route;
fs.readdirSync("./src/controllers").forEach(function(file) {
  if (file.substr(-3) == ".js") {
    route = require(`./src/controllers/${file}`);
    route.controller(app);
  }
});

app.get("/", (req, res) => {
  // TODO add redirecting logic
  res.redirect(301, "/ssr/ja");
});

app.get("/ssr/:locale", function(req, res) {
  const locale = req.params.locale;
  const { renderedString, appString } = serverSideRendering({ locale });
  const helmet = Helmet.renderStatic();

  res.render("reactssr", {
    googleSiteVerfication: process.env.GOOGLE_SITE_VERIFICATION,
    helmet,
    content: renderedString,
    appString
  });
});

app.get("/ssr/:locale", function(req, res) {
  const locale = req.params.locale;
  const { renderedString, appString } = serverSideRendering({ locale });
  const helmet = Helmet.renderStatic();

  res.render("reactssr", {
    googleSiteVerfication: process.env.GOOGLE_SITE_VERIFICATION,
    helmet,
    content: renderedString,
    appString
  });
});

// for react pages
app.get("*", function(req, res) {
  if (req.get("Host") === "gitadora-skill-viewer.herokuapp.com") {
    res.redirect(301, `http://gsv.fun${req.url}`);
  } else {
    res.render("react", {
      googleSiteVerfication: process.env.GOOGLE_SITE_VERIFICATION
    });
  }
});

app.listen(process.env.PORT, function() {
  console.log(`This app listening on port ${process.env.PORT}!`);
});

process.on("uncaughtException", function(err) {
  console.log("uncaughtException => ", err);
});
