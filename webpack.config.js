const HtmlWebPackPlugin = require('html-webpack-plugin')
const CleanWebPackPlugin = require('clean-webpack-plugin')
const path = require('path')

const pathsToClean = ['build']
const cleanOptions = {
  root: __dirname,
  exclude: [],
  verbose: true,
  dry: false
}

const plugins = [ // order matters!
  new CleanWebPackPlugin(pathsToClean, cleanOptions),
  new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
  })
]

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: plugins
}
