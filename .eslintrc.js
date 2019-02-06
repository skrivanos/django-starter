module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/react'
  ],
  plugins: [
    'prettier',
    'react-hooks'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
