const path = require("path");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");
const copyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require('./config')
const FriendlyErrorsWebpackPlugin=require('friendly-errors-webpack-plugin');
// webpack4以上要添加VueLoaderPlugin
const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
    entry: __dirname + "/src/main.js", //打包入口
    output: {
        //出口文件
        path: __dirname + "/build", //打包后存放的地方
        filename: "[name].[contenthash].js" //打包后的文件命名
    },
    devServer: config.devServer,
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'css-loader',
                include: path.resolve(__dirname + '/src/'),
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // 将 JS 字符串生成为 style 节点
                    'css-loader', // 将 CSS 转化成 CommonJS 模块
                    'sass-loader', // 将 Sass 编译成 CSS
                    {
                        loader: "postcss-loader",//添加浏览器兼容后缀
                        options: {
                            plugins: [
                                require("autoprefixer")(),
                            ]
                        }
                    },
                    {
                        loader: 'sass-resources-loader',
                        options: {
                          resources: [path.resolve(__dirname + "/src/assets/css/theme.scss"), path.resolve(__dirname + "/src/assets/css/mixin.scss")] // 绝对路径引入主题色文件
                        },
                    },
                ]
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: /node_modules/
            }
        ]
    },
    plugins: [
        new copyWebpackPlugin([{
            from:path.resolve(__dirname+'/static'),// 打包的静态资源目录地址
            to:'static' // 打包到dist下面的static
        }]),
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
              messages: [`Your application is running here: http://${config.devServer.host}:${config.devServer.port}`],
            }
          }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: "webpack",
            minify: {
                // 压缩HTML文件
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true // 压缩内联css
            },
            filename: "index.html", // 输出的模板名字
            template: "index.html" // 模板路径
        })
    ],
    stats:"none",
    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js", //重定向代理
            "@": path.resolve(__dirname + "/src/"), //重定向代理
        }
    }
};