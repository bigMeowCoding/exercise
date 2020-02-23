const path = require('path'),
    {CleanWebpackPlugin} = require('clean-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        app: [
            './src/index.js',
        ],
    },
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/i,
                loader: 'file-loader',
                options: {}
            },
            {
                test: /\.jpg$/i,
                loader: 'url-loader',
                options: {}
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        // options: {
                        //     importLoaders: 2,
                        //     modules: {
                        //         localIdentName: '[local]--[hash:base64:5]'
                        //     }
                        // }
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                    }
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 'css-loader'
                ]
            }
        ],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
    },
    performance: false,
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
        new CleanWebpackPlugin(
        ),
    ]
};
