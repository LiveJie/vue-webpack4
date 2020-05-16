module.exports = {
    devServer: {
        contentBase: "./build", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        host: '0.0.0.0',
        port: 9999,
        open: false
    }
}