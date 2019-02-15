const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const projectDir = path.resolve(__dirname, "../");
const publicDir = path.resolve(projectDir, "public/");
const appDir = path.resolve(projectDir, "src/");
const distDir = path.resolve(projectDir, "dist/");


module.exports = {
  entry: appDir + "/App.js",
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
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/, 
        loader: "url-loader?limit=8192" 
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
    filename: "offer-component.js",
    libraryTarget: "var",
    library: "offercomponent"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: publicDir,
    port: 3000,
    publicPath: "/",
    hotOnly: true,
    proxy: {
      "/images": {
          target: "https://www.bankbazaar.com",
          secure: false,
          changeOrigin: true
        }
    }
  },
  plugins: [
     new HTMLWebpackPlugin({
      template: path.resolve("public/index.html"),
      minify: false,
      inject: "head"
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};