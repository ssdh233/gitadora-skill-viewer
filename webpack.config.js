const webpack = require("webpack");
const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

const PUBLIC_DIR = path.resolve(__dirname, "src/public/js");
const REACT_DIR = path.resolve(__dirname, "src/react");

var config = {
  mode: "production",
  entry: ["@babel/polyfill", `${REACT_DIR}/App.jsx`],
  output: {
    path: PUBLIC_DIR,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        include: REACT_DIR
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
    })
  ]
};

module.exports = config;
