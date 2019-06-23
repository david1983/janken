module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  "parser": "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      "experimentalObjectRestSpread": true,
      "experimentalDecorators": true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "class-methods-use-this": 0,
    "no-param-reassign": 0,
    "react/jsx-indent": 0,
    "react/no-array-index-key": 0,
    "react/forbid-prop-types": 0,
    "consistent-return": 0,
    "no-console": 0,
    "no-undef": 0
  },
};
