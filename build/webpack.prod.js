const commonConfig = require('./webpack.common'), webpackMerge = require('webpack-merge');


const prodConfig = {
    mode: "production",
    devtool: 'cheap-module-source-map',
    output:{
        filename: '[name].[contenthash].js',
        chunkFilename: "[name].[contenthash].chunk.js",
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            name:true,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name:'vendors'
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                }
            }
        }
    },
};

module.exports = webpackMerge(
    commonConfig, prodConfig
);
