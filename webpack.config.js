const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const copyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack4以上要添加VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config = require('./config')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports = {
    entry: __dirname + "/src/main.js", // 打包入口
    output: { // 出口文件
        path: __dirname + "/dist", // 打包后存放的地方
        filename: "bundle.js" // 打包后的文件命名
    },
    devServer: config.devServer,
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js', // 重定向代理
           "@": path.resolve(__dirname + "/src/") // 设置模块基路径
        }
    },
    module: {
        rules: [
            { 
                test: /\.css$/, 
                use:'css-loader', 
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
                        loader: 'sass-resources-loader', // 绝对路径引入主题色文件
                        options: {
                          resources: [
                              path.resolve(__dirname + "/src/assets/css/theme.scss"), 
                              path.resolve(__dirname + "/src/assets/css/mixin.scss")
                            ] 
                        },
                    },
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: /node_modules/
            }
        ]
    },
    plugins: [
        // v5.12以上的版本要添加patterns
        new copyWebpackPlugin({
            patterns: [
                {
                    from:path.resolve(__dirname+'/static'),// 打包的静态资源目录地址 不经过 webpack，需要通过绝对路径来引用
                    to:'static' // 打包到dist下面的static
                }
            ]
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(), // 每次打包都先删除打包目录
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://${config.devServer.host}:${config.devServer.port}`],
            },
            onErrors: true ? config.devServer.onErrors: undefined // 是否开启错误捕获
        }),
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
    // stats:"none"
}