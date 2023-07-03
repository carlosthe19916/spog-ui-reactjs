import path from "path";
import merge from "webpack-merge";
import commonWebpackConfiguration from "./webpack.common";
import { stylePaths } from "./stylePaths";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { getEncodedEnv } from "./envLookup";
import { Configuration } from "webpack";
import "webpack-dev-server";

const brandType = process.env["PROFILE"] || "spog";

const config = merge<Configuration>(commonWebpackConfiguration, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    port: 3000,
    proxy: {
      // NOTE: Any future non-UI paths handled by the server package should be added here.
      "/api": "http://localhost:8083",
    },
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  optimization: {
    runtimeChunk: "single",
  },
  plugins: [
    new HtmlWebpackPlugin({
      // In dev mode, populate window._env at build time
      filename: "index.html",
      template: path.resolve(__dirname, "../public/index.html.ejs"),
      favicon: path.resolve(__dirname, `../public/${brandType}-favicon.svg`),
      templateParameters: {
        _env: getEncodedEnv(),
        brandType,
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        include: [...stylePaths],
        use: ["style-loader", "css-loader"],
      },
    ],
  },
});
export default config;
