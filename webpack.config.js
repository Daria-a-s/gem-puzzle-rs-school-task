const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './gem-puzzle/script.js'),
    },
   module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
  output: {
    path: path.resolve(__dirname, './gem-puzzle'),
    filename: 'index_bundle.js',
  },
      plugins: [
        new HtmlWebpackPlugin(),
    ],
};
