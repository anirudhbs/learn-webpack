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
  },
  module: {
    rules: [
      {
        test: /\.js$/, // file name pattern
        exclude: /node_modules/,
        use: [
          {
            loader: './remove-console-logs.js'
          },
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
  }
}
