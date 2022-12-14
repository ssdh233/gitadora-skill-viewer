const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

const DIST_DIR = path.resolve(__dirname, "src/public/js");
const SRC_DIR = path.resolve(__dirname, "src");

var appConfig = {
  mode: "production",
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

var scriptsConfig = {
  mode: "production",
  entry: {
    uploaddata_latest: `${SRC_DIR}/scripts/uploaddata_latest.js`,
    uploaddata_latest_dev: `${SRC_DIR}/scripts/uploaddata_latest_dev.js`,
    uploaddata_latest_local: `${SRC_DIR}/scripts/uploaddata_latest_local.js`,
    uploaddata_highvoltage: `${SRC_DIR}/scripts/uploaddata_highvoltage.js`,
    uploaddata_highvoltage_dev: `${SRC_DIR}/scripts/uploaddata_highvoltage_dev.js`,
    uploaddata_highvoltage_local: `${SRC_DIR}/scripts/uploaddata_highvoltage_local.js`,
    uploaddata_nextage: `${SRC_DIR}/scripts/uploaddata_nextage.js`,
    uploaddata_nextage_dev: `${SRC_DIR}/scripts/uploaddata_nextage_dev.js`,
    uploaddata_nextage_local: `${SRC_DIR}/scripts/uploaddata_nextage_local.js`,
    uploaddata_exchain: `${SRC_DIR}/scripts/uploaddata_exchain.js`,
    uploaddata_exchain_dev: `${SRC_DIR}/scripts/uploaddata_exchain_dev.js`,
    uploaddata_exchain_local: `${SRC_DIR}/scripts/uploaddata_exchain_local.js`,
    uploaddata_matixx: `${SRC_DIR}/scripts/uploaddata_matixx.js`,
    uploaddata_matixx_dev: `${SRC_DIR}/scripts/uploaddata_matixx_dev.js`,
    uploaddata_matixx_local: `${SRC_DIR}/scripts/uploaddata_matixx_local.js`,
    uploaddata_tbre: `${SRC_DIR}/scripts/uploaddata_tbre.js`,
    uploaddata_tbre_dev: `${SRC_DIR}/scripts/uploaddata_tbre_dev.js`,
    uploaddata_tbre_local: `${SRC_DIR}/scripts/uploaddata_tbre_local.js`
  },
  output: {
    path: DIST_DIR,
    filename: "[name].js"
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
  }
};

module.exports = [appConfig, scriptsConfig];
