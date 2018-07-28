const path = require('path')

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
    moduleA: './moduleA.js'
    // vendor: [] // 'react', 'react-dom', 'redux'
  },
  devtool: 'source-map', // for debugging?
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunk].js'
  }
}
