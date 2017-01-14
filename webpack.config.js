var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'app', 'js', 'index.jsx'),
    output: {
        path: path.resolve(__dirname, 'app_build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: './node_modules/',
                loader: 'babel-loader'
            }
        ]
    }
};