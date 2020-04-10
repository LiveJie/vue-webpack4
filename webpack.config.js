const path = require("path")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack4以上要添加VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    entry: __dirname + "/src/main.js",//打包入口
    output: {//出口文件
        path: __dirname + "/build",//打包后存放的地方
        filename: "[name].[contenthash].js" //打包后的文件命名
    },
    devServer: {
        contentBase: "./build",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port: 9999
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: /node_modules/
            },
            { 
                test: /\.css$/, 
                use:'css-loader', 
                include: path.resolve(__dirname + '/src/'), 
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack',
            minify: { // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true// 压缩内联css
            },
            filename: 'index.html', // 输出的模板名字
            template: 'index.html' // 模板路径
        })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' //重定向代理
        }
    }
}