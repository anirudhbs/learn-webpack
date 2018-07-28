const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

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
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
    moduleA: './moduleA.js'
    // vendor: [] // 'react', 'react-dom', 'redux'
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
    }
  },
  devtool: 'source-map', // for debugging?
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunk].js'
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
              presets: ['env']
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
    })
  ]
}
