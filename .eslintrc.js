module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["react"],
  rules: {
    "no-console": "off",
    "react/prop-types": "off"
  },
  overrides: [
    {
      files: ["src/react/**/*.jsx", "src/**/*.js", "app.js", "webpack.*.js"],
      parser: "babel-eslint",
      env: {
        browser: true,
        node: true,
        es6: true
      }
    },
  ]
};
