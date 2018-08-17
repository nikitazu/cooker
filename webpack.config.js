const path = require("path");
const config = {
  context: path.join(__dirname, "js"),
  entry: "./Main.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  devtool: "inline-source-map"
};

module.exports = config;

