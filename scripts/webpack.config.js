const path = require("path");
const pages = require("./pages");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  //   entry: {
  //     app: "./examples/index.js",
  //   },
  entry: pages.reduce((config, page) => {
    config = { ...config, ...page.entry };
    return config;
  }, {}),

  output: {
    filename: "[name].[hash:8].js",
    path: path.resolve("dist"),
  },
  plugins: [new CleanWebpackPlugin(), ...pages.map((page) => page.plugin)],
  mode: "development",
};
