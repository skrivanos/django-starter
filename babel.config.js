module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  ignore: ['node_modules/', 'dist/'],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    'react-hot-loader/babel'
  ]
};
