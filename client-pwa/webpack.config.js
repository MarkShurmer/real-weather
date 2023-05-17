const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { CheckerPlugin } = require('awesome-typescript-loader');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            // {
            //     test: /\.jsx?$/,
            //     use: ['babel-loader'],
            //     exclude: /node_modules/,
            // },
            // {
            //     test: /\.tsx?$/,
            //     use: [
            //         'babel-loader',
            //         {
            //             loader: 'ts-loader',
            //             options: {
            //                 onlyCompileBundledFiles: true,
            //             },
            //         },
            //     ],
            // },
            {
                test: /\.[jt]sx?$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            compilerOptions: {
                                noEmit: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        plugins: [new TsconfigPathsPlugin({ configFile: path.join(__dirname, './tsconfig.json'), logLevel: 'info' })],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        static: path.join(__dirname, './src'),
        port: 3001,
        hot: 'only',
        compress: true,
        open: true,
    },
};
