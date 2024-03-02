require("dotenv").config();
const path = require("path");
const nodeExternals = require("webpack-node-externals");

const SRC_DIR = path.resolve(__dirname, "src");

const serverConfig = {
  target: "node", // use require() & use NodeJs CommonJS style
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  mode: "development",
  entry: {
    server: ["@babel/polyfill", `${__dirname}/app.js`]
  },
  output: {
    path: __dirname,
    filename: "app.dist.js"
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
  }
};

module.exports = serverConfig;
