var path = require('path');
var webpack = require('webpack');
var commonPlugins = [
    new webpack.DefinePlugin({
        CONFIG: JSON.stringify({
            privateKey: process.env.PRIVATE_KEY,
            privateKeyPassword: process.env.PRIVATE_KEY_PASSWORD,
            recipientId: process.env.RECIPIENT_ID
        })
    })
];
var prodPlugins = [
    new webpack.DefinePlugin({
        'process.env':{
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
];
var isDev = process.env.DEV_ENV;

var plugins = isDev ? commonPlugins : commonPlugins.concat(prodPlugins);
var loaders = isDev ?
    [
        'react-hot-loader',
        'babel-loader?cacheDirectory&presets[]=react&presets[]=es2015'
    ] :
    [ 'babel-loader?cacheDirectory&presets[]=react&presets[]=es2015' ];

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
    devtool: isDev ? 'source-map' : '',
    module: {
        loaders: [
            {
                // pre-process every *.js file (except for ones in node_modules/) with Babel
                test: /\.js$/,
                exclude: [ /node_modules/, /lib/, /worker-crypto-context.js/, /worker-crypto-helpers.js/ ],
                loaders: loaders
            }
        ]
    },
    plugins: plugins
};
