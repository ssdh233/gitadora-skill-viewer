const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const CronJob = require("cron").CronJob;

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
app.use(cookieParser());

// for express endpoints.
let route;
fs.readdirSync("./src/controllers").forEach(function(file) {
  if (file.substr(-3) == ".js") {
    route = require(`./src/controllers/${file}`);
    route.controller(app);
  }
});

app.get("/", (req, res) => {
  const lang =
    req.cookies.locale || req.acceptsLanguages("ja", "zh", "en") || "ja";

  res.setHeader("Cache-Control", "public, max-age=0");
  res.redirect(301, `/${lang}`);
});

// for react pages
app.get("/:locale(en|ja|zh)", function(req, res) {
  if (req.get("Host") === "gitadora-skill-viewer.herokuapp.com") {
    res.redirect(301, `http://gsv.fun${req.url}`);
  } else {
    const locale = req.params.locale;
    res.cookie("locale", locale);

    const { renderedString, appString } = serverSideRendering({ locale });
    const helmet = Helmet.renderStatic();

    res.render("react", {
      googleSiteVerfication: process.env.GOOGLE_SITE_VERIFICATION,
      helmet,
      content: renderedString,
      appString
    });
  }
});

// for jobs

fs.readdirSync("./src/jobs").forEach(file => {
  if (file.substr(-3) == ".js") {
    let job = require(`./src/jobs/${file}`);

    const cronJob = new CronJob(job.cronSchedule, job.job);
    cronJob.start();
  }
});

app.listen(process.env.PORT, function() {
  console.log(`This app listening on port ${process.env.PORT}!`);
});

process.on("uncaughtException", function(err) {
  console.log("uncaughtException => ", err);
});
