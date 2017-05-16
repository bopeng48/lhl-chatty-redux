/* eslint-env node */
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const CleanupPlugin = require("webpack-clean-obsolete-chunks");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader" // translates CSS into CommonJS
          }, {
            loader: "sass-loader" // compiles Sass to CSS
          }]
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                url: false,
              },
            },
          ],
        }),
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "react"],
            plugins: [
              "transform-object-rest-spread",
              "transform-decorators-legacy",
              "transform-class-properties",
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin("[name].[chunkhash].css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function(module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf("node_modules") !== -1;
      },
    }),
    //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest", //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    }),
    new HtmlPlugin({
      title: "Chatty App",
      template: "./src/index.html.ejs",
    }),
    new CleanupPlugin(),
  ],
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-maps",
};
