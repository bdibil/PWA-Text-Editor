const HtmlWebpackPlugin = require('html-webpack-plugin');

// DONE: Add CSS loaders and babel to webpack.
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const WebpackPwaManifest = require('webpack-pwa-manifest');

// DONE: Add and configure workbox plugins for a service worker and manifest file.
const WorkboxPlugin = require('workbox-webpack-plugin');

const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',

   // Entry point for files
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',

      editor: './src/js/editor.js',
      header: './src/js/header.js',
  
    },

  // Output for our bundles
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },


    plugins: [

    // Webpack plugin that generates our html file and injects our bundles. 
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Just Another Text Editor'
      }),


      
      // Injects our custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }), 

      
      // Creates a manifest.json file.

      //    NEED  TO    EDIT   ??
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Text Editor',
        short_name: 'J.A.T.E',
        description: 'Edit Text Here!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),


      new MiniCssExtractPlugin(),

      // new WorkboxPlugin.GenerateSW({
      //   // Do not precache images
      //   exclude: [/\.(?:png|jpg|jpeg|svg)$/],
  
      //   // Define runtime caching rules.
      //   runtimeCaching: [{
      //     // Match any request that ends with .png, .jpg, .jpeg or .svg.
      //     urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
  
      //     // Apply a cache-first strategy.
      //     handler: 'CacheFirst',
  
      //     options: {
      //       // Use a custom cache name.
      //       cacheName: 'images',
  
      //       // Only cache 10 images.
      //       expiration: {
      //         maxEntries: 10,
      //       },
      //     },
      //   }],
      // })

    ],



    module: {
      // CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
