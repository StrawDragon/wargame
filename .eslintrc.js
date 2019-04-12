module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
    'max-len': ["error", { "code": 180, "tabWidth": 2 , "ignoreComments": true }, ],
    'import/no-default-export': 2,
    'import/prefer-default-export': 0,
    'comma-style': ["error", "last"],
    'no-param-reassign': ["error", { "props": false }],
  },
};
