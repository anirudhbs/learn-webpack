const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const HelloWorldPlugin = require('./HelloWorldPlugin')
const pathsToClean = ['build']

const cleanOptions = {
  root: __dirname,
  exclude: [],
  verbose: true,
  dry: false
}

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
    vendor: ['react', 'react-dom'] // 'react', 'react-dom', 'redux'
  },
  devServer: {
    // hot: true,
    proxy: {
      '/api': 'http://localhost:3000' // route to API server: sends all /api requests to localhost
    },
    open: true
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  devtool: 'inline-source-map', // for debugging?
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.csv/,
        use: [
          {
            loader: './csv-to-json-loader.js'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: './remove-comments-loader.js'
          },
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { // order matters, bottom up order
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new HelloWorldPlugin({
      message: '\nhello world!\n'
    }),
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html'
    })
    // new webpack.HotModuleReplacementPlugin()
  ]
}
