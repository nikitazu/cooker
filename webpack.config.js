/*
 * Copyright (C) 2018 Nikita B. Zuev
 *
 * This file is part of Cooker.
 *
 * Cooker is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Cooker is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Cooker.  If not, see <https://www.gnu.org/licenses/>.
 */

// DEV & PROD Configuration
// ========================

const path = require("path");
const config = {
  context: path.join(__dirname, "js"),
  entry: "./Main.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  externals: {
    "underscore-min-1.9.1.js": "_"
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      { test: /\.js$/,
        exclude: /node_modules|(lib\/.*)|ConstantData.js/,
        loader: "eslint-loader", // https://eslint.org/docs/rules/
        enforce: "pre",
        options: { emitError: true }
      }
    ]
  }
};

module.exports = config;
