const fs = require('fs')
// 引入环境变量依赖
const dotenv = require('dotenv')
const clientEnv = process.env.npm_lifecycle_event;
let envPath = ''
switch (clientEnv) {
  case "dev":
    envPath = '.env.development'
    break;
  case "build":
    envPath = '.env.production'
    break;
}
const configEnv = dotenv.parse(fs.readFileSync(envPath))
for (const k in configEnv) {
  if(configEnv.hasOwnProperty(k)) {
    process.env[k] = configEnv[k]
  }
}

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