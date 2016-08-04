var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/public',
        publicPath: '/public/'
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                // pre-process every *.js file (except for ones in node_modules/) with Babel
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot-loader',
                    'babel-loader?cacheDirectory&presets[]=react&presets[]=es2015'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            CONFIG: JSON.stringify(require('./config/config.json'))
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ]
};
