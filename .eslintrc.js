module.exports = {
  extends: ["prettier", "eslint:recommended", "plugin:react/recommended"],
  plugins: ["prettier", "react"],
  rules: {
    "prettier/prettier": "error",
    "no-undef": "off"
  },
  overrides: [
    {
      files: ["src/react/**/*.jsx"],
      parser: "babel-eslint",
      env: {
        browser: true
      },
      rules: {
        "react/prop-types": "off"
      }
    },
    {
      files: ["src/**/*.js", "app.js", "webpack.config.js"],
      excludedFiles: ["src/public/**/*.js"],
      env: {
        node: true
      },
      parser: "babel-eslint",
      rules: {
        "prefer-template": "error"
      }
    },
    {
      files: ["src/public/**/*.js"],
      env: {
        browser: true
      },
      parser: "babel-eslint",
      rules: {
        "prefer-template": "error"
      }
    }
  ]
};
