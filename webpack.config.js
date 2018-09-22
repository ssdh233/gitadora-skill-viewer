const webpack = require("webpack");
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

const PUBLIC_DIR = path.resolve(__dirname, "src/public/js");
const REACT_DIR = path.resolve(__dirname, "src/react");

var config = {
  entry: `${REACT_DIR}/App.jsx`,
  output: {
    path: PUBLIC_DIR,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: REACT_DIR,
        loader: "babel-loader"
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
    })
  ]
};

module.exports = config;
