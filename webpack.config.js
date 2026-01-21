const path = require("path");
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  mode: "development",
  entry: {
    app: "./index.ts",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".ts"],
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Development",
      template: "index.html",
      inject: true,
    }),
  ],
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        exclude: [/node_modules/, /\.d\.ts$/],
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  devServer: {
    port: 8080,
  },
};
