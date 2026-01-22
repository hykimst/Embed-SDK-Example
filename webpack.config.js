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
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".d.ts"],
  },
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
        test: /\.(\.d\.ts|\.tsx)$/,
        loader: "ts-loader",
        exclude: [/node_modules[\\/]/],
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/", // Important for serving assets correctly
  },
  devServer: {
    port: 8080,
  },
};
