// imports for the webpack to be created
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// all of this is used to help make a webpage downloadable as well as
// it helps to make the webpack compatible with older browser versions
// allowing for more accessability to interact with more users

module.exports = () => {
    return {
      mode: "development",
      //entry point for install
      //based off index.html, using the install.js
      entry: {
        main: "./src/js/index.js",
        install: "./src/js/install.js",
      },
      output: {
        //output for where to store the bundles
        filename: "[name].bundle.js",
        //storing bundles in the 'dist' folder
        path: path.resolve(__dirname, "dist"),
      },
      plugins: [
        //generates html file and injects it into our bundles
        new HtmlWebpackPlugin({
          template: "./index.html",
          //naming the application once downloaded
          title: "Just Another text Editor(JATE)",
        }),
        //inject custom service worker
        new InjectManifest({
          swSrc: "./src-sw.js",
          swDest: "src-sw.js",
        }),
        //create manifest.json file
        new WebpackPwaManifest({
          fingerprints: false,
          inject: true,
          name: "Just Another Text Editor",
          short_name: "JATE",
          description: "Offline Text Editor",
          background_color: "#225ca3",
          theme_color: "#225ca3",
          start_url: "./",
          publicPath: "./",
          icons: [
            {
                //adding images into the json file
              src: path.resolve("src/images/logo.png"),
              sizes: [96, 128, 192, 256, 384, 512],
              destination: path.join("assets", "icons"),
            },
          ],
        }),
      ],
  
      module: {
        rules: [
          //loading the css into the webpack
          {
            //regex for css, including all files with .css attatched
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          //babel loader to use ES6 with es5 and older versions of JS for outdated browsers
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                //preset for babel and environmental variable
                presets: ["@babel/preset-env"],
                plugins: [
                  "@babel/plugin-proposal-object-rest-spread",
                  "@babel/transform-runtime",
                ],
              },
            },
          },
        ],
      },
    };
  };