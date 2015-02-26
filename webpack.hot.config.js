var path = require("path");
var config = require("./webpack.common.config");
var webpack = require("webpack");
require("jquery");

config.entry.push("webpack-dev-server/client?http://localhost:3000",
                  "webpack/hot/dev-server",
                  "bootstrap-sass!./bootstrap-sass.config.js"); // custom bootstrap

config.output = { filename: "express-bundle.js", // this file is served directly by webpack
                  path: path.join(__dirname, './build'),
                  // path: '/build',
                  publicPath: '/build'};

// config.module.loaders.push(
//   { test: require.resolve("jquery"), loader: "expose?jQuery" }
//   // { test: /\.jsx$/, loaders: ["react-hot", "es6", "jsx?harmony"] }
// );

config.plugins = [ new webpack.HotModuleReplacementPlugin() ];
config.devtool = "eval-source-map";

// All the styling loaders only apply to hot-reload, not rails
config.module.loaders.push(
  // { test: require.resolve("jquery"), loader: "expose?jQuery" },
  // { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
  { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
  // { test: /\.js$/, loaders: ["react-hot", "es6", "jsx?harmony"] },
  { test: /\.jsx$/, loaders: ["react-hot", "es6", "jsx?harmony"] },
  { test: /\.css$/, loader: "style-loader!css-loader" },
  { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded&imagePath=/assets/images&includePaths[]=" +
    path.resolve(__dirname, "./assets/stylesheets")},

  // The url-loader uses DataUrls. The file-loader emits files.
  { test: /\.woff$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
  { test: /\.woff2$/,   loader: "url-loader?limit=10000&minetype=application/font-woff" },
  { test: /\.ttf$/,    loader: "file-loader" },
  { test: /\.eot$/,    loader: "file-loader" },
  { test: /\.svg$/,    loader: "file-loader" });

module.exports = config;
