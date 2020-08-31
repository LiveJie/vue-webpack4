// 引入环境变量依赖
const fs = require('fs')
const dotenv = require('dotenv')
const envConfig = dotenv.parse(fs.readFileSync('.env.production'))
for (const k in envConfig) {
  process.env[k] = envConfig[k]
  console.log(process.env[k])
}
// console.log(process.env.INTERFACE_PATH, "process.env")
// console.log(process.env.INTERFACE_NAME, "process.env")
module.exports = {
    devServer: {
        contentBase: "./dist", // 本地服务器所加载的页面所在的目录
        historyApiFallback: true, // 找不到界面默认返回首页
        disableHostCheck: true, // 检查主机host 开发环境下可建议禁止
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