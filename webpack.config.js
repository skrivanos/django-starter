const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const BundleTracker = require('webpack-bundle-tracker');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SentryCliPlugin = require('@sentry/webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const devMode = process.env.NODE_ENV !== 'production';
const hotReload = process.env.HOT_RELOAD === '1';
const appDir = './djangostarter/';

const eslintRule = {
  enforce: 'pre',
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  exclude: /node_modules/
};

const vueRule = {
  test: /\.vue$/,
  use: 'vue-loader',
  exclude: /node_modules/
};

const styleRule = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        sourceMap: true
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: () => [
          autoprefixer({
            browsers: ['last 2 versions']
          })
        ]
      }
    },
    'sass-loader'
  ]
};

const jsRule = {
  test: /\.js$/,
  loader: 'babel-loader',
  include: path.resolve(appDir, './static/js'),
  exclude: /node_modules/
};

const assetRule = {
  test: /.(jpg|png|woff(2)?|eot|ttf|svg)$/,
  loader: 'file-loader'
};

const plugins = [
  new webpack.ProvidePlugin({
    'window.Sentry': 'Sentry',
    Sentry: 'Sentry',
    'window.jQuery': 'jquery',
    jQuery: 'jquery',
    $: 'jquery'
  }),
  new BundleTracker({ filename: './webpack-stats.json' }),
  new VueLoaderPlugin(),
  new MiniCssExtractPlugin({
    filename: devMode ? '[name].css' : '[name].[hash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false
  }),
  new webpack.HotModuleReplacementPlugin(),
  new CleanWebpackPlugin(['./dist']),
  new CopyWebpackPlugin([
    {
      from: path.resolve(appDir, './static/images/**/*'),
      to: path.resolve('./dist/images/[name].[ext]'),
      toType: 'template'
    }
  ])
];

if (devMode) {
  styleRule.use = ['css-hot-loader', ...styleRule.use];
} else {
  plugins.push(
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'RAVEN_JS_DSN',
      'SENTRY_ENVIRONMENT',
      'SOURCE_VERSION'
    ])
  );
  if (process.env.SENTRY_DSN) {
    plugins.push(
      new SentryCliPlugin({
        include: '.',
        release: process.env.SOURCE_VERSION,
        ignore: ['node_modules', 'webpack.config.js']
      })
    );
  }
}

module.exports = {
  context: __dirname,
  entry: path.resolve(appDir, './static/js/main.js'),
  output: {
    path: path.resolve('./dist/'),
    filename: '[name]-[hash].js',
    publicPath: hotReload ? 'http://localhost:8080/' : ''
  },
  devtool: devMode ? 'cheap-eval-source-map' : 'source-map',
  devServer: {
    hot: true,
    quiet: false,
    headers: { 'Access-Control-Allow-Origin': '*' },
    disableHostCheck: true // Currently some webpack bug: https://github.com/webpack/webpack-dev-server/issues/1604
  },
  module: {
    rules: [eslintRule, vueRule, jsRule, styleRule, assetRule]
  },
  externals: {
    jquery: 'jQuery',
    Sentry: 'Sentry'
  },
  plugins,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    }
  }
};
