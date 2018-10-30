module.exports = {
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "plugin:react/recommended",
    "prettier/react",
    "prettier/standard",
    "plugin:prettier/recommended"
  ],
  plugins: ["standard", "react", "jsx-a11y", "prettier"],
  rules: {
    "react/prop-types": 0,
    "react/display-name": 0,
    "prettier/prettier": [
      "error",
      {
        singleQuote: true
      }
    ],
    "no-var": "error" // optional, recommended when using es6+
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 8 // optional, recommended 6+
  }
};
