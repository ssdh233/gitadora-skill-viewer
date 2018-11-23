const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

const PUBLIC_DIR = path.resolve(__dirname, "src/public/js");
const SRC_DIR = path.resolve(__dirname, "src");

var config = {
  mode: "production",
  entry: {
    bundle: ["@babel/polyfill", `${SRC_DIR}/client.js`]
  },
  output: {
    path: PUBLIC_DIR,
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
