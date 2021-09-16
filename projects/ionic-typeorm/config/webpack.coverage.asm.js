const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    plugins: [
        new webpack.NormalModuleReplacementPlugin(/^typeorm$/, function (result) {
            result.request = result.request.replace(/typeorm/, 'typeorm/browser');
        }),
        new webpack.ProvidePlugin({
            'window.SQL': path.join(__dirname, '../../../sql.js/dist/sql-asm.js'),
        }),
    ],
    resolve: {
        fallback: {
            fs: false,
            crypto: require.resolve('crypto-browserify'),
            path: require.resolve('path-browserify'),
            stream: require.resolve('stream-browserify'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                loader: 'istanbul-instrumenter-loader',
                options: { esModules: true },
                enforce: 'post',
                include: require('path').join(__dirname, '..', 'src'),
                exclude: [/\.(e2e|spec)\.ts$/, /node_modules/, /(ngfactory|ngstyle)\.js/],
            },
        ],
    },
};
