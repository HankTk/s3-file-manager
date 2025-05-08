const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        ...process.env,
        ...dotenv.config().parsed
      })
    })
  ]
}; 