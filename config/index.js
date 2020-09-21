// const path = require("path");
const fs = require('fs')
// 引入环境变量依赖
const dotenv = require('dotenv')

module.exports = {
  mode: "development",
  devServer: {
    contentBase: "./dist", // 本地服务器所加载的页面所在的目录
    publicPath: '/', // 公共路径 打包后资源可以访问的路径
    historyApiFallback: true, // 找不到界面默认返回首页
    disableHostCheck: true, // 检查主机host 开发环境下可建议禁止
    inline: true, //实时刷新
    host: 'localhost',
    port: 8888,
    open: false
  },
  hiddleEnv: (env) => {
    let configEnv = dotenv.parse(fs.readFileSync(`.env.${env|| 'development'}`))
    for (let k in configEnv) {
        if(configEnv.hasOwnProperty(k)) {
            process.env[k] = configEnv[k]
        }
    }
  },
  onErrors: () => {
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