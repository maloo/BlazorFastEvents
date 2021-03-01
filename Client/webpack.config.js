const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const { merge } = require('webpack-merge');

const base = {
  entry: {
    'client': ['scripts/app.ts'],
  },
  context: path.resolve(__dirname, 'src'),
  output: {
    path: path.resolve(__dirname, '../wwwroot'),
    filename: 'scripts/main.js',
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: [
          {
            loader: 'ts-loader',
            options: { onlyCompileBundledFiles: true },
          },
        ],
      },

    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.ts', '.js', 'scss'],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

const prod = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: {
    publicPath: '/',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
  ],
};

const dev = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  output: {
    publicPath: 'http://localhost:8080/',
  },
  stats: {
    colors: true,
  },
  devServer: {
    contentBase: '../wwwroot',
    clientLogLevel: 'info',
    port: 8080,
    inline: true,
    historyApiFallback: false,
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 500,
    },
  },
  devtool: 'inline-source-map',
};

module.exports = (env) => merge(base, env && env.production ? prod : dev);
