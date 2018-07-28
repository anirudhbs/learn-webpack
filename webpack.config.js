const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index',
  devtool: 'source-map', // for debugging?
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  }
}
