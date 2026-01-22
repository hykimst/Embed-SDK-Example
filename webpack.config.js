// Modules; not CommonJS
import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "development",
  entry: {
    app: "./src/index.ts",
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Development",
      template: "index.html",
      scriptLoading: "module",
      showErrors: true,
      inject: true,
    }),
  ],
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.ts|\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /@matterport[\\/]sdk[\\/]dist[\\/]index\.(umd|esm)\.js$/,
        type: "javascript/auto", // configuration is a specific setting used in webpack module rules. It instructs the bundler to process a file as a general JavaScript module that can use a mix of module syntaxes, including CommonJS (require), ESM (import/export), and dynamic imports. 
        use: [
          {
            loader: "string-replace-loader",
            options: {
              // Using a more global search in case the variable name changes
              search: /import\((e|s|arguments\[0\])\)/g,
              replace: "import(/* webpackIgnore: true */ $1)",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/", // Important for serving assets correctly
  },
  devServer: {
    port: 8080,
  },
};
