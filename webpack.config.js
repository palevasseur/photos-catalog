module.exports = {
    entry: './app/js/index.jsx',
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: './node_modules/',
                loader: 'babel'
            }
        ]
    }
};