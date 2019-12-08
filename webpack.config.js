const webpack = require('webpack');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {TsConfigPathsPlugin} = require('awesome-typescript-loader');

const dotenv = require('dotenv');
const DotenvPlugin = require('dotenv-webpack');
const SentryCliPlugin = require('@sentry/webpack-plugin');

const envPath = path.resolve(__dirname, '.env');
dotenv.config({path: envPath});

module.exports = (env, argv) => {
  const production = argv.mode === 'production';
  const productionPlugins = [];
  if (production) {
    productionPlugins.push(new webpack.ExtendedAPIPlugin());
    if (process.env.SENTRY_HOST) {
      productionPlugins.push(new SentryCliPlugin({
        include: './dist',
      }));
    }
  }

  return {
    mode: argv.mode || 'development',
    entry: './src/main.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'assets/js/bundle.js',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      plugins: [new TsConfigPathsPlugin()],
    },
    devtool: production ? 'hidden-source-map' : 'source-map',
    module: {
      rules: [
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'css'),
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          enforce: 'pre',
          test: /\.(js|ts)x?$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'eslint-loader',
          options: {
            cache: true,
            fix: true,
            failOnError: true,
          },
        },
        {
          test: /\.tsx?$/,
          use: {
            loader: 'awesome-typescript-loader',
            options: {
              useCache: true,
              cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/awesome-typescript-loader'),
              useBabel: true,
              babelCore: '@babel/core',
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'html/index.html',
        templateParameters: {
          __webpack_hash__: '',
        },
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          minifyCSS: true,
        },
        hash: true,
      }),
      new HtmlWebpackPlugin({
        filename: '404.html',
        template: 'html/404.html',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
          minifyCSS: true,
        },
        inject: false,
      }),
      new CopyWebpackPlugin([
        {
          from: 'assets',
          to: 'assets',
        },
      ]),
      new DotenvPlugin({
        path: envPath,
      }),
    ].concat(productionPlugins),
    devServer: {
      hot: true,
      contentBase: path.resolve(__dirname, 'assets'),
      watchContentBase: true,
    },
  };
};
