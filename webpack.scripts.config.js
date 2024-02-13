const webpack = require("webpack");
const path = require("path");
const { ON_SERVICE_VERSIONS, CURRENT_VERSION } = require("./src/constants");

const DIST_DIR = path.resolve(__dirname, "src/public/js");
const SRC_DIR = path.resolve(__dirname, "src");

var createScriptsConfig = (version, flag) => ({
  mode: "production",
  entry: {
    uploaddata_latest: `${SRC_DIR}/scripts/uploaddata_template.js`
  },
  output: {
    path: DIST_DIR,
    filename: flag
      ? `uploaddata_${version}_${flag}.js`
      : `uploaddata_${version}.js`
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        include: SRC_DIR
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.TARGET_DOMAIN":
        flag === "local"
          ? '"http://127.0.0.1:5000"'
          : flag === "dev"
          ? '"//gitadora-skill-viewer-dev.herokuapp.com"'
          : '"http://gsv.fun"',
      "process.env.SCRIPT_DOMAIN":
        flag === "local"
          ? '"http://127.0.0.1:5000"'
          : '"//gitadora-skill-viewer.herokuapp.com"',
      "process.env.VERSION":
        version === "latest" ? `"${CURRENT_VERSION}"` : `"${version}"`
    })
  ]
});

let moduleExports = [];

moduleExports.push(createScriptsConfig("latest"));
moduleExports.push(createScriptsConfig("latest", "dev"));
moduleExports.push(createScriptsConfig("latest", "local"));

ON_SERVICE_VERSIONS.slice(1).forEach(version => {
  moduleExports.push(createScriptsConfig(version));
  moduleExports.push(createScriptsConfig(version, "dev"));
  moduleExports.push(createScriptsConfig(version, "local"));
});

module.exports = moduleExports;
