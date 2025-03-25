require("dotenv").config();
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");

const PUBLIC_JS_DIR = path.resolve(__dirname, "src/public/js");
const SRC_DIR = path.resolve(__dirname, "src");

const isDevelopment = process.env.NODE_ENV === "development";

const clientConfig = {
  mode: isDevelopment ? "development" : "production",
  devServer: {
    contentBase: "./src/public",
    port: 8000
  },
  entry: {
    bundle: ["@babel/polyfill", `${SRC_DIR}/client.js`]
  },
  output: {
    path: PUBLIC_JS_DIR,
    filename: isDevelopment ? "[name].js" : "[name].[contenthash].js"
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
            loader: "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
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
    !isDevelopment &&
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240
      }),
    !isDevelopment && new ManifestPlugin()
  ].filter(Boolean)
};

module.exports = clientConfig;
