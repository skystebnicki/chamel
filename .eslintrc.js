module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parser: 'babel-eslint',
  plugins: ['prettier', 'react'],
  rules: {
    'prettier/prettier': 'error',
  },
};
