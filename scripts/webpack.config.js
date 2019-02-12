const path = require("path");
const webpack = require("webpack");

const projectDir = path.resolve(__dirname, "../");
const publicDir = path.resolve(projectDir, "public/");
const appDir = path.resolve(projectDir, "src/");
const distDir = path.resolve(projectDir, "dist/");


module.exports = {
  entry: appDir + "/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: distDir,
    publicPath: distDir,
    filename: "offer-component.js"
  },
  devServer: {
    contentBase: publicDir,
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};