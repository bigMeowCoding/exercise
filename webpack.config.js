const path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  // for Webpack 5
  optimization: {
    realContentHash: true,
  },
  entry: {
    index: "./src/index.tsx",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx", ".css", ".less"],
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|mjs|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: [
            // A Babel preset that can automatically determine the Babel plugins and polyfills
            // https://github.com/babel/babel-preset-env
            [
              "@babel/preset-env",
              {
                targets: ["last 4 versions and not ie >= 6"],
                modules: false,
                useBuiltIns: false,
                debug: false,
              },
            ],
            ["@babel/preset-react"],
            "@babel/preset-typescript",
          ],
          plugins: [
            ["@babel/plugin-proposal-class-properties", { loose: true }],
          ],
        },
      },
      {
        test: /\.(css|less|scss|sass)$/,
        use: [

          MiniCssExtractPlugin.loader,

          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader", // compiles Less to CSS
          },
        ],
      },
      // {
      //   test: /\.tsx?$/,
      //   loader: "ts-loader",
      //   include: path.join(__dirname, "src"),
      // },
    ],
  },
  devServer: {
    port: 3000,
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new MiniCssExtractPlugin(),

    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),


    new CleanWebpackPlugin(),
  ],
};
