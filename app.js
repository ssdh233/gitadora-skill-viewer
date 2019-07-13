const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const CronJob = require("cron").CronJob;

const reactRoute = require("./src/server").default;

app.use(compression());

app.use(express.static("src/public", { maxAge: 31536000000 }));
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

// for react pages
app.get("/:locale(en|ja|zh)", reactRoute);
app.get("/:locale(en|ja|zh)/*", reactRoute);

// redirect if the first param is not language
app.get("*", (req, res) => {
  const lang =
    req.cookies.locale || req.acceptsLanguages("ja", "zh", "en") || "ja";

  res.setHeader("Cache-Control", "public, max-age=0");
  if (req.url === "/") {
    res.redirect(301, `/${lang}`);
  } else {
    res.redirect(301, `/${lang}${req.url}`);
  }
});

// for jobs
fs.readdirSync("./src/jobs").forEach(file => {
  if (file.substr(-3) == ".js") {
    let job = require(`./src/jobs/${file}`);

    if (job.job && job.cronSchedule) {
      const cronJob = new CronJob(job.cronSchedule, job.job);
      cronJob.start();
    }
  }
});

app.listen(process.env.PORT, function() {
  console.log(`This app listening on port ${process.env.PORT}!`);
});

process.on("uncaughtException", function(err) {
  console.log("uncaughtException => ", err);
});

// for nodemon
process.on("SIGUSR2", () => {
  process.exit(0);
});
