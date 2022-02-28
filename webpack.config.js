const path = require('path');

module.exports = {
  entry: './GetOffMyLawn-bundle.js',
  output: {
    filename: 'GetOffMyLawn-bundle.js',
    path: path.resolve(__dirname, 'deploy'),
  },
};