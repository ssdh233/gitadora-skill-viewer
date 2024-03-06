module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["react"],
  rules: {
    "no-undef": "off",
    "no-console": "off"
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
      files: ["src/**/*.js", "app.js", "webpack.*.js"],
      excludedFiles: ["src/public/**/*.js"],
      env: {
        node: true
      },
      parser: "babel-eslint",
      rules: {
        "prefer-template": "error"
      }
    },
  ]
};
