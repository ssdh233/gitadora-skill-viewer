const webpack = require('webpack');
const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");

const PUBLIC_DIR = path.resolve(__dirname, 'public/js');
const REACT_DIR = path.resolve(__dirname, 'src/react');
const TYPESCRIPT_DIR = path.resolve(__dirname, 'src/typescript');

var config = {
  entry: {
    bundle: REACT_DIR + '/App.jsx',
    uploaddata_matixx: TYPESCRIPT_DIR + '/uploaddata_matixx.ts',
    uploaddata_matixx_local: TYPESCRIPT_DIR + '/uploaddata_matixx_local.ts',
    uploaddata_tb: TYPESCRIPT_DIR + '/uploaddata_tb.ts',
    uploaddata_tb_local: TYPESCRIPT_DIR + '/uploaddata_tb_local.ts',
    uploaddata_tbre: TYPESCRIPT_DIR + '/uploaddata_tbre.ts',
    uploaddata_tbre_local: TYPESCRIPT_DIR + '/uploaddata_tbre_local.ts',
  },
  output: {
    path: PUBLIC_DIR,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test : /\.jsx?/,
        include : REACT_DIR,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ],
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
    })
  ],
};

module.exports = config;