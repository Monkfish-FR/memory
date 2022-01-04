const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  context: path.resolve(__dirname, 'src'),
  entry: ['./main.js', './main.scss'],
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
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    open: true,
    port: 8080,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
};
