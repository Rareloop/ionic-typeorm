const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    plugins: [
        new webpack.NormalModuleReplacementPlugin(/^typeorm$/, function (result) {
            result.request = result.request.replace(/typeorm/, 'typeorm/browser');
        }),
        new webpack.ProvidePlugin({
            'window.SQL': 'sql.js',
        }),
        // Copy the wasm file to the output dir
        new CopyPlugin([{ from: '../../../sql.js/dist/sql-wasm.wasm' }]),
    ],
    resolve: {
        fallback: {
            fs: false,
            crypto: require.resolve('crypto-browserify'),
            path: require.resolve('path-browserify'),
            stream: require.resolve('stream-browserify'),
        },
    },
};
