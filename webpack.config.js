const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const webpack = require("webpack");
const { ON_SERVICE_VERSIONS, CURRENT_VERSION } = require("./src/constants");

const DIST_DIR = path.resolve(__dirname, "src/public/js");
const SRC_DIR = path.resolve(__dirname, "src");

const isDevelopment = process.env.NODE_ENV !== 'production';

var appConfig = {
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    bundle: ["@babel/polyfill", `${SRC_DIR}/client.js`]
  },
  output: {
    path: DIST_DIR,
    filename: "[name].[contenthash].js"
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
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader:
              "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240
    }),
    new ManifestPlugin()
  ]
};

var createScriptsConfig = (version, flag) => ({
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    uploaddata_latest: `${SRC_DIR}/scripts/uploaddata_template.js`,
  },
  output: {
    path: DIST_DIR,
    filename: flag ? `uploaddata_${version}_${flag}.js` : `uploaddata_${version}.js`
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
  plugins: [new webpack.DefinePlugin({
    "process.env.TARGET_DOMAIN": flag === "local" ? "\"http://127.0.0.1:5000\"" : flag === "dev" ? "\"//gitadora-skill-viewer-dev.herokuapp.com\"" : "\"http://gsv.fun\"",
    "process.env.SCRIPT_DOMAIN": flag === "local" ? "\"http://127.0.0.1:5000\"" : "\"//gitadora-skill-viewer.herokuapp.com\"",
    "process.env.VERSION": version === "latest" ? `\"${CURRENT_VERSION}\"` : `\"${version}\"`,
  })]
});

let moduleExports = [appConfig];

moduleExports.push(createScriptsConfig("latest"));
moduleExports.push(createScriptsConfig("latest", "dev"));
moduleExports.push(createScriptsConfig("latest", "local"));

ON_SERVICE_VERSIONS.slice(1).forEach(version => {
  moduleExports.push(createScriptsConfig(version));
  moduleExports.push(createScriptsConfig(version, "dev"));
  moduleExports.push(createScriptsConfig(version, "local"));
})

module.exports = moduleExports;
