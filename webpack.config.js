console.log('help me, I\'m trapped in a license plate factory');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/js/index.js',
    './src/less/main.less'
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "/js/bundle.js"
  },
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin('./dist/css/main.css')
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)/,
      exclude: /node_modules/,
      // cacheable: true,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react'],
        plugins: ['transform-runtime']
      },
    }, {
      test: /.json/,
      exclude: [/node_modules/, /config/],
      // cacheable: true,
      loader: 'json-loader',
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract({
        loader: "css!less"
      })
    },
    {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
    {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
    {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
    {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
  ],
  },
};
