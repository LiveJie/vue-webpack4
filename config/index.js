module.exports = {
    devServer: {
        contentBase: "./dist", // 本地服务器所加载的页面所在的目录
        historyApiFallback: true, // 找不到界面默认返回首页
        inline: true, //实时刷新
        host: '0.0.0.0',
        port: 8888,
        open: false
    },
    onErrors: ()=> {
        const notifier = require('node-notifier')
        return (severity, errors) => {
          if (severity !== 'error') return
          const error = errors[0]
          const filename = error.file && error.file.split('!').pop()
          notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
          })
        }
    }
}