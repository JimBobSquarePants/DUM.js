const webpack = require('webpack');

module.exports = {
  entry: {
    dum: './src/dum.js',
    'dum.min': './src/dum.js',
  },
  output: {
    filename: './es5/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
    }),
  ],
};
