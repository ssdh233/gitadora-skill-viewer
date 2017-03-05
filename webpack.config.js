var webpack = require('webpack');
var path = require('path');

var PUBLIC_DIR = path.resolve(__dirname, 'public/js');
var REACT_DIR = path.resolve(__dirname, 'react');

var config = {
  entry: REACT_DIR + '/App.jsx',
  output: {
    path: PUBLIC_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders : [
      {
        test : /\.jsx?/,
        include : REACT_DIR,
        loader : 'babel-loader'
      }
    ]
  },
  node: {
    fs: "empty"
  }
};

module.exports = config;