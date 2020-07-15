const path = require('path');
const webpack = require("webpack");

// plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: './src/js/entry.js',
    output: {
        filename: 'component.js', // 번들 작업할 파일
        path: path.resolve(__dirname, 'dist'), // 번들화 될 파일 경로
        /**
         * output.library
         * output.libraryTarget
         * [참고] http://blog.hyeyoonjung.com/2019/05/26/setting-webpack-for-javascript-library/
         */
        library: '',
        libraryTarget: 'window'
    },
    plugins: [
        new CleanWebpackPlugin(), // 사용하지 않는 잉여 자산들을 삭제
        new HtmlWebpackPlugin({ // 분리되어있는 css, js 를 cusotm html 에 추가하여 하나의 html 파일로 번들링
            template: 'src/bundle.html',
            filename: 'index.html'
        }),
        /**
         * import, require 선언 없이 jquery 를 사용하기 위해 지정
         * [참고] https://webpack.js.org/plugins/provide-plugin/
         */
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            }
        ]
    }
    /**
     * bundle 생성 시, jquery dependency 를 포함하지 않기위해 지정
     * [참고] https://webpack.js.org/configuration/externals/
     */
    // externals: {
    //     jquery: 'jQuery'
    // }
};