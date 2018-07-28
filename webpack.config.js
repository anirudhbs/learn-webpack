const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const pathsToClean = ['build']

const cleanOptions = {
  root: __dirname,
  exclude: [],
  verbose: true,
  dry: false
}

class HelloWorldPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    // compiler.hooks.tapAsync('HelloWorldPlugin', function (compilation, callback) {
    // var filelist = 'in this build\n\n'
    console.log('hello world')
    // })
  }
}

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
    moduleA: './moduleA.js'
    // vendor: [] // 'react', 'react-dom', 'redux'
  },
  devServer: {
    hot: true,
    // historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000' // route to API server
      // sends all /api requests to localhost
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
        test: /\.js$/, // file name pattern
        exclude: /node_modules/,
        use: [
          // {
          //   loader: './remove-console-logs.js'
          // },
          {
            loader: './remove-comments-loader.js'
          },
          {
            loader: 'babel-loader',
            options: { // usually stored in .babelrc file
              presets: ['env'],
              plugins: ['syntax-dynamic-import']
              // plugins: babel plugins used go here
            }
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
    new webpack.HotModuleReplacementPlugin()
  ]
}
