const webpack = require('webpack');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'window.__env__': JSON.stringify({
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
        AWS_REGION: process.env.AWS_REGION,
        AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
        AWS_ENDPOINT: process.env.AWS_ENDPOINT,
      }),
    }),
  ],
}; 