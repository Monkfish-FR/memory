const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src'),
  // entry: ['./main.js', './scss/main.scss'],
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: './fonts/[name][ext]',
        },
      },
      {
        test: /\.png$/,
        type: 'asset/resource',
        generator: {
          filename: './images/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new NodePolyfillPlugin(),
  ],
  devServer: {
    open: true,
    port: 8080,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
};
