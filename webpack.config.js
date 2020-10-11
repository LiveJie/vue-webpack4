const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const copyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
// webpack4以上要添加VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const config = require('./config')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
module.exports = (env, argv) => {
    argv.env && (config.mode = "production")
    config.hiddleEnv(argv.env)
    return webpackConfigFun()
}

const webpackConfigFun = ()=> {
    return {
        mode: process.env.ENV === 'development' ? 'development': 'production',
        entry: __dirname + "/src/main.js", // 打包入口
        output: { // 出口文件
            path: __dirname + "/dist", // 打包后存放的地方
            filename: "[name].[chunkhash:8].bundle.js", // 打包后的文件命名
            publicPath: process.env.ENV === 'development' ? '/': '/ui-doc/'
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
                    test: /\.css$/i, 
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        // 'style-loader', // 将 JS 字符串生成为 style 节点 使用min-css-extract-plugin后取消
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
                onErrors: process.env.ENV === 'development' ? config.devServer.onErrors: undefined // 是否开启错误捕获
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
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash:8].css',
                chunkFilename: '[name].[contenthash:8].css',
            }),
            process.env.ENV === 'development' ? '': new CompressionPlugin({
                test: /\.(js|css)(\?.*)?$/i,
                exclude: /\/excludes/,
                filename: '[path][base].gz',
                deleteOriginalAssets: true,
            }),
        ],
        stats: process.env.ENV === 'development' ? 'none': true
    }
}
