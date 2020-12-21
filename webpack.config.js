const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    dum: "./src/dum.js",
    "dum.min": "./src/dum.js",
  },
  optimization: {
    minimize: false
  },
  output: {
    filename: "./es5/[name].js",
    libraryTarget: "umd",
    library: "$d",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          },
        },
      },
    ],
  },
  plugins: [
    new TerserPlugin({
      test: /\.min\.js$/
    }),
  ],
};
