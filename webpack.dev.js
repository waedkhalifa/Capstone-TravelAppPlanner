const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        },
        {
            test: /\.css$/, // Matches .css files
            use: [
                'style-loader', // Extracts CSS into separate files
                'css-loader', // Translates CSS into CommonJS
            ],
        },
        {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    },
                },
            ],
        },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CssMinimizerPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/service-worker.js', to: '' },
                { from: 'src/client/media', to: 'media' },
            ]
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
         '...',
            new CssMinimizerPlugin(),
        ],
      },
    devServer: {
        
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 3030,
        open: true,
        hot: true,
        historyApiFallback: true,
        allowedHosts: 'all'
    }
}
