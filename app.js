const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const CronJob = require("cron").CronJob;
const { ApolloServer } = require("apollo-server-express");

const reactRoute = require("./src/server").default;
const typeDefs = require("./src/schema");
const resolvers = require("./src/resolvers");

app.use(compression());

app.use(
  express.static("src/public", {
    maxAge: 31536000000,
    setHeaders: (res, path) => {
      if (path.includes("uploaddata")) {
        res.set("Cache-Control", "no-cache");
      }
    }
  })
);
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

// for graphql
const server = new ApolloServer({
  typeDefs,
  resolvers
});
server.applyMiddleware({ app });

// for react pages
app.get("/:locale(en|ja|zh|ko)", reactRoute);
app.get("/:locale(en|ja|zh|ko)/*", reactRoute);

// redirect if the first param is not language
app.get("*", (req, res) => {
  const lang =
    req.cookies.locale || req.acceptsLanguages("ja", "zh", "en", "ko") || "ja";

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
      console.log("Starting cron job", file);

      if (process.env.RUN_CRON_ON_START_UP === "true") {
        console.log("Run cron job once on deployment:", file);
        job.job();
      }
    }
  }
});

app.listen(process.env.PORT, function() {
  console.log(`This app listening on port ${process.env.PORT}!`);
});

process.on("uncaughtException", function(err) {
  console.log("uncaughtException => ", err);
});

process.on("SIGINT", () => {
  console.log("Recieved signal SIGINT");
  process.exit(0);
});
