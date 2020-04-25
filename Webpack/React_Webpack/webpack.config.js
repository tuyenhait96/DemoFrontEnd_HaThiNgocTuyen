const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VENDOR_LIBS = [
  "axios",
  "bootstrap",
  // "font-awesome",
  "jquery",
  "popper.js",
  "react",
  "react-router-dom",
  "react-dom",
  "redux-thunk",
  "redux",
];
const devServer = {
  port: 4000,
  open: true,
  disableHostCheck: true,
  historyApiFallback: true,
  overlay: true,
  inline: true,
  compress: true,
  contentBase: "/",
};

module.exports = {
  entry: {
    bundle: "./src/index.js",
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
  },
  mode: "development",
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  module: {
    // loaders: [
    //   {
    //     loader: "babel-loader",
    //     query: {
    //       presets: ["@babel/preset-react"],
    //       // plugins: ["transform-class-properties"],
    //     },
    //     test: /\.jsx?$/,
    //     exclude: "/node_modules",
    //   },
    // ],
    rules: [
      {
        use: "babel-loader",
        test: /\.js$|jsx/,
        //   khong cho no tim trong day
        exclude: "/node_modules",
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/,
      },
      {
        loader: "file-loader",
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.wav$|\.ttf$|\.ttf$|\.mp3$|\.ico$/,
      },
    ],
  },
  devtool: "eval-source-map",
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windown.$": "jquery",
      "windown.jQuery": "jquery",
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
  devServer,
  optimization: {
    splitChunks: {
      cacheGroups: {
        // In dev mode, we want all vendor (node_modules) to go into a chunk,
        // so building main.js is faster.
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          // Exclude pre-main dependencies going into vendors, as doing so
          // will result in webpack only loading pre-main once vendors loaded.
          // But pre-main is the one loading vendors.
          // Currently undocument feature:  https://github.com/webpack/webpack/pull/6791
          // chunks: chunk => chunk.name !== "pre-main.min"
        },
      },
    },
    runtimeChunk: {
      name: "manifest",
    },
  },
};
