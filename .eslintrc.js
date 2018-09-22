module.exports = {
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
  },
  "overrides": [
    {
      "files": [ "src/react/*.jsx" ],
      "parser": "babel-eslint",
      "env": {
        "browser": true
      }
    },
    {
      "files": [ "src/**/*.js", "app.js", "webpack.config.js" ],
      "excludedFiles": [ "src/public/**/*.js" ],
      "env": {
        "node": true
      },
      "parser": "babel-eslint",
      "rules": {
        "prefer-template": "error"
      }
    },
    {
      "files": [ "src/public/**/*.js" ],
      "env": {
        "browser": true
      },
      "parser": "babel-eslint",
      "rules": {
        "prefer-template": "error"
      }
    }
  ]
}