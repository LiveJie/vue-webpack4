#### 项目介绍
# webpack4.0从零到一搭建vue基础项目框架 vue + vue-router + vuex + hot + 换肤 + moke...

# 架构说明

```
.
├── config
│   └── index.js
├── dist
├── index.html
├── list.md
├── package.json
├── src
│   ├── api
│   │   ├── axiosExpand.js
│   │   └── index.js
│   ├── App.vue
│   ├── assets
│   │   └── css
│   │       ├── common.scss
│   │       ├── flex.scss
│   │       ├── index.scss
│   │       ├── mixin.scss
│   │       ├── reset.css
│   │       └── theme.scss
│   ├── data
│   │   ├── index.js
│   │   └── test.js
│   ├── main.js
│   ├── mock
│   │   ├── index.js
│   │   └── test.js
│   ├── router
│   │   └── index.js
│   ├── store
│   │   ├── getters.js
│   │   ├── index.js
│   │   └── modules
│   │       └── main.js
│   ├── utils
│   │   └── index.js
│   └── views
│       └── index.vue
├── static
│   └── test.txt
├── webpack.config.js
└── yarn.lock
.
```

#### 安装教程

1. npm i // cnpm i

#### 使用说明

1. 运行项目npm run dev
2. 打包 npm run build

# 主要内容
```
一. 初始化工程项目
二.添加热部署
三.添加vue套餐
四.添加换肤功能
五.添加项目端口提示
六.添加axios并二次封装
七.添加moke.js模拟后端数据
八.设置环境变量
```

## 一. 初始化工程项目
生成基础项目

```
npm init -y 
```
创建 src、dist目录 ， src/main.js、index.html、webpack.config.js文件
目录如下
```
project
├── dist
├── src
│   └── main.js
├── index.html
├── package.json
└── webpack.config.js

```
index.html
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>webpack</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```
main.js
```
var content = document.createElement("div");
content.textContent = "Hello webpack!";
document.querySelector("#app").appendChild(content);
```
引入webpack webpack-cli html-webpack-plugin三个包
```
npm i webpack webpack-cli html-webpack-plugin -D 
```
webpack.config.js
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: __dirname + "/src/main.js", // 打包入口
    output: { // 出口文件
        path: __dirname + "/dist", // 打包后存放的地方
        filename: "bundle.js" // 打包后的文件命名
    },
    plugins: [
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
    ]
}
```
package.json scripts下面添加一行命令
```
"build": "webpack --mode production"
```
执行下面代码
```
npm run build
```
可以看到dist目录多出了两个打包文件，一个是index.html,一个是bundle.js
浏览器打开index.html
可以看到页面出现了Hello webpack! OK到这里已经完成了项目的简单打包了。
教练我看到别人的项目可以实时刷新，我也想学，OK，热部署安排一下。

## 二.添加热部署
安装热部署依赖
```
npm i -D webpack-dev-server
```
webpack.config.js文件添加devServer的配置
```
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: __dirname + "/src/main.js", // 打包入口
    output: { // 出口文件
        path: __dirname + "/dist", // 打包后存放的地方
        filename: "bundle.js" // 打包后的文件命名
    },
    devServer: {
        contentBase: "./dist", // 本地服务器所加载的页面所在的目录
        historyApiFallback: true, // 找不到界面默认返回首页
        inline: true, // 实时刷新
        port: 8888
    },
    plugins: [
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
    ]
}
```
理所当然package.json也是要相对应修改
```
"dev": "webpack-dev-server --open"
```
运行项目
```
npm run dev
```
可以看到webpack运行后自动打开了默认浏览器并在页面上输出了Hello webpack!
修改下main.js内容
```
var content = document.createElement("div");
content.textContent = "Hello webpack! Webpack牛批！";
document.querySelector("#app").appendChild(content);
```
保存修改后可以发现浏览器的内容也随着自动刷新了，到这里webpack热加载就完成了。

## 三.添加vue套餐
安装babel,vue套餐依赖，css依赖 @注意这里的babel-loader建议安装7.x版本 头铁的可以不指定版本安装最新版
-S --save 运行时依赖 dependencies
-D --save-dev 开发时依赖 devDependencies
此外还有peerDependencies、bundleDependencies、optionalDependencies
前两项其实已经足够日常使用了，后三项是作为npm包的发布者需要考虑使用的，有兴趣可以查阅原文章以及npm的文档
```
npm i -S vue vue-router 
npm i -D babel-core babel-loader@7.1.1 vue-loader vue-loader vue-template-compiler css-loader
```

项目中添加src/views、src/router目录， src/views/index.vue src/router/index.js、src/App.vue 文件
目录如下,带有+号的就是新增的
```
project
├── index.html
├── list.md
├── package.json
├── dist
│   ├── bundle.js
│   └── index.html
├── src
│   ├── App.vue       ++++++++++++++++          
│   ├── main.js                     
│   ├── router        ++++++++++++++++  
│   │   └── index.js  ++++++++++++++++          
│   └── views         ++++++++++++++++      
│       └── index.vue ++++++++++++++++      
└── webpack.config.js

```
views/index.vue
```
<template>
  <div>vue webpack</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  }
}
</script>

<style>
</style>
```
router/index.js
```
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    routes: [
      {
        path: '/',
        name: 'home',
        component: (resolve) => require(['../views/index.vue'], resolve),
      }
    ],
    mode: 'history'
})
```
App.vue
```
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  min-width: 1200px;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
```
main.js
```
import Vue from "vue";
import App from "./App.vue";
import router from './router'

new Vue({
    el: "#app",
    router,
    components: {
        App,
    },
    template: "<App/>"
});
```
webpack.config.js
```
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack4以上要添加VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: __dirname + "/src/main.js", // 打包入口
    output: { // 出口文件
        path: __dirname + "/dist", // 打包后存放的地方
        filename: "bundle.js", // 打包后的文件命名
        publicPath: '/'
    },
    devServer: {
        contentBase: "./dist", // 本地服务器所加载的页面所在的目录
        historyApiFallback: false, // 找不到界面默认返回首页
        inline: true, // 实时刷新
        port: 8888
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' //重定向代理
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
    ]
}
```
运行项目
```
npm run dev
```
修改下index.vue里面的内容，把vue webpack改成hello webpack
![image.png](//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d1b62a9ee1a4d99a701263f65756df2~tplv-k3u1fbpfcp-zoom-1.image)

下面添加vuex
```
cnpm i -S vuex
```
src目录下添加store、store/module目录, 添加store/index.js、store/store、store/module/main.js
目录如下
```
project
├── index.html
├── list.md
├── package.json
├── dist
│   ├── bundle.js
│   └── index.html
├── src
│   ├── App.vue
│   ├── main.js
│   ├── router
│   │   └── index.js
│   ├── store            ++++++++++++++++++++++   
│   │   ├── getters.js   ++++++++++++++++++++++           
│   │   ├── index.js     ++++++++++++++++++++++           
│   │   └── modules      ++++++++++++++++++++++       
│   │       └── main.js  ++++++++++++++++++++++           
│   └── views
│       └── index.vue
└── webpack.config.js

```
src/main.js
```
import Vue from "vue";
import App from "./App.vue";
import router from './router'
import store from './store'

new Vue({
    el: "#app",
    router,
    store,
    components: {
        App,
    },
    template: "<App/>"
});
```
store/index.js
```
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
Vue.use(Vuex)

const state = {
}

const mutations = {

}

const actions = {

}

//获取modules下面的文件数组
const modulesFiles = require.context('./modules', false, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
  getters,
  mutations,
  actions,
  state
})
export default store
```
getters.js
```
const getters = {
    test: state => state.main.test
}
export default getters
```
store/modules/main.js
```
const state = {
    text: 'webpack 牛批！'
  }
  
  const mutations = {

  }
  
  const actions = {}
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
```
views/index.vue
```
<template>
  <div>{{text}}</div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(["text"])
  },
  mounted() {
      console.log(this, "11")
  }
}
</script>

<style>
</style>
```
运行项目
```
npm run dev
```
页面上出现webpack 牛批！就OK了

## 四.添加换肤功能
添加全局sass变量
```
npm i -D style-loader node-sass sass-loader sass-resources-loader postcss-loader autoprefixer
```
src下创建assets、assets/css目录, assets/css下创建index.scss、mixin.scss、reset.css、theme.scss、common.scss、flex.scss
目录如下
```
project
├── index.html
├── package.json
├── dist
│   ├── bundle.js
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets                 ++++++++++++++++++++ 
│   │   └── css                ++++++++++++++++++++ 
│   │       ├── common.scss    ++++++++++++++++++++             
│   │       ├── index.scss     ++++++++++++++++++++             
│   │       ├── mixin.scss     ++++++++++++++++++++             
│   │       ├── reset.css      ++++++++++++++++++++        
│   │       ├── flex.css       ++++++++++++++++++++             
│   │       └── theme.scss     ++++++++++++++++++++             
│   ├── main.js
│   ├── router
│   │   └── index.js
│   ├── store
│   │   ├── getters.js
│   │   ├── index.js
│   │   └── modules
│   │       └── main.js
│   └── views
│       └── index.vue
└── webpack.config.js

```
theme.scss
```
$font-color-theme1: blue;
$bg-theme1: blue;


$font-color-theme2: red;
$bg-theme2: red;

$font-color-theme3: yellow;
$bg-theme3: yellow;
```
reset.css
```
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
html {
	height: 100%;
}
body {
	line-height: 1;
	height: 100%;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a{
	text-decoration: none;
	color: #000;
}
a:active{
	text-decoration: none;
	color: #000;
}
.clearfixed{
	clear: both;
}
.clearfixed::after, .clearfixed::before {
	content: "";
	clear: both;
	display: block;
	height: 0;
	width: 0
}
```
index.scss
```
@import "./common.scss";
@import "./flex.scss";
@import "./reset.css";
```
mixin.scss
```
@mixin font_color {
  color: $primary-theme1;
  [data-theme="theme1"] & {
    color: $primary-theme1;
  }

  [data-theme="theme2"] & {
    color: $primary-theme2;
  }

  [data-theme="theme3"] & {
    color: $primary-theme3;
  }
}

@mixin primary_color {
  color: $primary-theme1;
  [data-theme="theme1"] & {
    color: $primary-theme1;
  }

  [data-theme="theme2"] & {
    color: $primary-theme2;
  }

  [data-theme="theme3"] & {
    color: $primary-theme3;
  }
}

@mixin bg_color {
  background: $primary-theme1;
  [data-theme="theme1"] & {
    background: $primary-theme1;
  }

  [data-theme="theme2"] & {
    background: $primary-theme2;
  }

  [data-theme="theme3"] & {
    background: $primary-theme3;
  }
}

@mixin solid_color {
  border: 1px solid  $primary-theme1;
  [data-theme="theme1"] & {
    border: 1px solid  $primary-theme1;
  }
  
  [data-theme="theme2"] & {
    border: 1px solid  $primary-theme2;
  }
  
  [data-theme="theme3"] & {
    border: 1px solid  $primary-theme3;
  }
}

// 单行省略号
@mixin Ellipsis{
  overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
}

// 多行省略号
@mixin EllipsisMore($height, $lineHeight, $num){
  width:100%;
  min-height: 20px;
  max-height: $height;
  line-height: $lineHeight; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  display: -webkit-box; 
  -webkit-line-clamp: $num;
  -webkit-box-orient: vertical;
}

// flex居中

@mixin flexCenter{
  display: flex;
  justify-content: center;
  align-items: center;
}
// flex居中

@mixin flexCenter{
  display: flex;
  justify-content: center;
  align-items: center;
}
```
common.scss
```
.clear {
    clear: both;
}

.cursor {
    cursor: pointer;
}

.font12 {
    font-size: 12px;
}

.font14 {
    font-size: 14px;
}

.font16 {
    font-size: 16px;
}

.font18 {
    font-size: 18px;
}

.font20 {
    font-size: 20px;
}

.font24 {
    font-size: 24px;
}

.font30 {
    font-size: 30px;
}

.font36 {
    font-size: 36px;
}

.font46 {
    font-size: 46px;
}

.weight {
    font-weight: bold;
}

.clear {
    clear: bold;
}

.clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
}

.clearfloat {
    zoom: 1;
}

[v-cloak] {
    display: none;
}

.el-select .el-input .el-select__caret {
    -ms-transition: transform .3s;
    -ms-transform: rotateZ(180deg);
}

.font-text {
    font-size: 14px;
    color: #999;
}

.font-title {
    color: #333;
    font-size: 18px;
}

.hot {
    color: #b71ed7;
    font-weight: 500;
    font-style: inherit;
}

.red {
    color: #e8001c;
    font-weight: 500;
    font-style: inherit;
}

.hoverColor1 {
    cursor: pointer;
    &:hover {
        color: #ef5924 !important;
    }
}

.hoverColor2 {
    cursor: pointer;
    &:hover {
        background: #f1f1f1 !important;
    }
}
```
flex.scss
```
.flex {
    display: flex;
  }
  
  .flex1 {
    flex: 1;
  }
  
  .flex2 {
    flex: 2;
  }
  
  .flex3 {
    flex: 3;
  }
  
  .flex4 {
    flex: 4;
  }
  
  .jcenter {
    justify-content: center;
  }
  
  .column {
    flex-direction: column;
  }
  
  .row {
    flex-direction: row;
  }
  
  .aitem {
    align-items: center;
  }
  
  .clearbox {
    box-sizing: border-box;
  }
  
  .jaround {
    justify-content: space-around;
  }
  
  .jbetween {
    justify-content: space-between;
  }
```
webpack.config.js
```
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack4以上要添加VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: __dirname + "/src/main.js", // 打包入口
    output: { // 出口文件
        path: __dirname + "/dist", // 打包后存放的地方
        filename: "bundle.js", // 打包后的文件命名
        publicPath: '/'
    },
    devServer: {
        contentBase: "./dist", // 本地服务器所加载的页面所在的目录
        historyApiFallback: false, // 找不到界面默认返回首页
        inline: true, // 实时刷新
        port: 8888
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' , // 重定向代理
+         "@": path.resolve(__dirname + "/src/") // 设置模块基路径
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
+           {
+               test: /\.scss$/,
+               use: [
+                   'style-loader', // 将 JS 字符串生成为 style 节点
+                   'css-loader', // 将 CSS 转化成 CommonJS 模块
+                   'sass-loader', // 将 Sass 编译成 CSS
+                   {
+                       loader: "postcss-loader",//添加浏览器兼容后缀
+                       options: {
+                           plugins: [
+                               require("autoprefixer")(),
+                           ]
+                       }
+                   },
+                   {
+                       loader: 'sass-resources-loader', // 绝对路径引入主题色文件
+                       options: {
+                         resources: [
+                             path.resolve(__dirname + "/src/assets/css/theme.scss"), 
+                             path.resolve(__dirname + "/src/assets/css/mixin.scss")
+                           ] 
+                       },
+                   },
+               ]
+           },
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
    ]
}
```
到这里基本是完成了，不过是scss全局变量完成，实行换肤还差一点点
src下新建utils文件夹，新建utils/index.js文件
目录如下
```
project
├── index.html
├── package.json
├── dist
│   ├── bundle.js
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets                 
│   │   └── css                
│   │       ├── common.scss    
│   │       ├── index.scss     
│   │       ├── mixin.scss     
│   │       ├── reset.css      
│   │       └── theme.scss     
│   ├── main.js
│   ├── router
│   │   └── index.js
│   ├── store
│   │   ├── getters.js
│   │   ├── index.js
│   │   └── modules
│   │       └── main.js
│   ├── utils               ++++++++++
│   │   └── index.js        ++++++++++
│   └── views
│       └── index.vue
└── webpack.config.js

```
src/main.js修改
```
import Vue from "vue";
import App from "./App.vue";
import router from './router'
import store from './store'
import "@/assets/css/index.scss";

if(localStorage.getItem("WINDOWS_THEME")) {
    window.document.documentElement.setAttribute('data-theme', localStorage.getItem("WINDOWS_THEME"))
}

new Vue({
    el: "#app",
    router,
    store,
    components: {
        App,
    },
    template: "<App/>"
});
```
views/index.vue修改
```
<template>
  <div class="index-wrapper">
    <header class="index-header flex">
      <div class="theme theme1"></div>
      <div class="theme theme2"></div>
      <div class="theme theme3"></div>
    </header>
    <div class="content">
      <div class="primary jcenter aitem flex">主题色</div>
      <div class="bth-box">
        <div class="list cursor theme1" @click="changeTheme('theme1')">改变主题色1</div>
        <div class="list cursor theme2" @click="changeTheme('theme2')">改变主题色2</div>
        <div class="list cursor theme3" @click="changeTheme('theme3')">改变主题色3</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { setTheme } from "@/utils"
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(["text"])
  },
  methods: {
    changeTheme(type) {
      setTheme(type)
    }
  },
  mounted() {
      console.log(this, "11")
  }
}
</script>

<style  lang="scss" scoped>
.index-wrapper {
  .theme {
    width: 100px;
    height: 100px;
  }
  .theme1 {
    background: $primary-theme1;
  }
  .theme2 {
    background: $primary-theme2;
  }
  .theme3 {
    background: $primary-theme3;
  }
  .content {
    margin: 50px;
    display: flex;
    .primary {
      width: 100px;
      height: 100px;
      @include bg_color;
      color: #fff;
    }
    .bth-box {
      margin-left: 20px;
      .list {
        width: 100px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #ddd;
        border-radius: 2px;
        margin-bottom: 10px;
        text-align: center;
        color: #fff;
        &.theme1 {
          background: blue;
        }
        &.theme2 {
          background: red;
        }
        &.theme3 {
          background: yellow;
        }
      }
    }
  }
}
</style>
```
现在页面是这样的
![image.png](//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b25cda2ef3c477da6aa626318b3e342~tplv-k3u1fbpfcp-zoom-1.image)
点击改变主题色按钮可以切换了，换肤功能完成。

## 五.添加项目端口提示
现在项目运行完成是这样的
![image.png](//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e88265734d504d1793dcbd46deb416c2~tplv-k3u1fbpfcp-zoom-1.image)
别人的项目是这样的
![image.png](//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d27fc995363f4e24a8235b4b13e3263d~tplv-k3u1fbpfcp-zoom-1.image)
好整洁，教练我想学，OK
添加控制台提示依赖包，顺便把静态资源打包插件安装上，还有文件清除插件
```
npm i -D friendly-errors-webpack-plugin copy-webpack-plugin clean-webpack-plugin
```
新建config、static文件夹，config/index.js,statuc/test.txt文件
目录如下
```
project
├── index.html
├── package.json
├── dist
│   ├── bundle.js
│   └── index.html
├── config          +++++++
│   └── index.js    +++++++      
├── static          +++++++
│   └── test.txt    +++++++        
...
config/index.js
```
module.exports = {
    devServer: {
        contentBase: "../dist", // 本地服务器所加载的页面所在的目录
        publicPath: '/', // 公共路径 打包后资源可以访问的路径
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
```
```
webpack.config.js修改(注意) // copy-webpack-plugin v5.12以上的版本要添加patterns
```
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
        filename: "bundle.js", // 打包后的文件命名
        publicPath: '/'
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
    stats:"none"
}
```
启动项目
```
npm run dev
```
![image.png](//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/856c11adf4ca4469b0def1ff167c22f8~tplv-k3u1fbpfcp-zoom-1.image)
灰常好，到这里添加控制台提示就结束了，当然FriendlyErrorsWebpackPlugin不仅仅只有启动项目的提示信息，还能识别某些类别的webpack错误，并清理，聚合和优先级，以提供更好的开发人员体验。
## 六.添加请求方法axios并二次封装
安装axios
```
npm i -S axios
```
src下添加添加api、data文件夹，添加api/index.js、api/axiosExpand.js、data/index.js、test.js目录如下
```
project
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── api                  ++++++++       
│   │   ├── index.js         ++++++++           
│   │   └── axiosExpand.js   ++++++++               
│   ├── data                 ++++++++       
│   │   ├── index.js         ++++++++           
│   │   └── test.js          ++++++++       
...

```
api/index.js
```
/* eslint-disable */
/**
 * @author jie
 *  date 2019/3/26
 *  data 文件夹下面放不同模块的接口
 *  method: 'get' 'delete' 'post' 'put'
 *  value: true   接口有value时 参数以键值对的值拼接到链接后面 xxx.com/getUser?name=哈哈&id=2
 *  linkId: true  接口有linkId时 id带在链接后面 类似 xxx.com/getUser/10
 *  random: true  接口有random时 添加随机数防止接口缓存
 *  headerToken 是否使用token 目前所有接口都默认使用
 *  bodyParam: true  请求如果需要一部分参数带头部,一部分参数body需要在请求的时候把参数独立放到参数里面处理
 *
 */
import Axios from 'axios'
import apiData from '../data'
import qs from 'querystring'
import {
  catchAjaxResolve,
  catchAjaxReject
} from './axiosExpand'

// 设置默认值
Axios.defaults.timeout = 30000;
Axios.defaults.baseURL = "/";
Axios.defaults.headers = {
  'Content-Type': 'application/json'
};

// 数据请求之前
Axios.interceptors.request.use((config) => {
  return config
}, error => {
  promise.reject(error)
})

// 提交成功并返回数据时
Axios.interceptors.response.use(response => {
    return catchAjaxResolve(response)
  },
  error => {
    return catchAjaxReject(error)
  }
)

function formatAxios(url, data, params, requestType) {
  if (params.linkId) {
    url += '/' + data.id
    data = null
  }
  if (params.random) {
    if (Object.keys(data)) {
      url += '&time=' + Math.random()
    } else {
      url += '?time=' + Math.random()
    }
  }
  if (params.value || requestType === 'get' || requestType === 'delete') {
    url += '?' + qs.stringify(data)
    data = null
  }
  if (data && data.bodyParam) {
    const bodyParam = JSON.parse(JSON.stringify(data.bodyParam));
    delete data.bodyParam
    url += '?' + qs.stringify(data)
    data = bodyParam
  }
  return Axios[requestType](url, data)
}

function Http(name, data = {}) {
  if (Boolean(apiData[name].headers)) {
    for (let keys in apiData[name].headers) {
      if (apiData[name].headers.hasownproperty(keys)) {
        Axios.defaults.headers[keys] = apiData[name].headers[keys]
      }
    }
  }
  return formatAxios(apiData[name].url, data, apiData[name], apiData[name].method)
}

export default Http
```
api/axiosExpand.js
```
// 这里用的是elementUI 弹框提示
// import { Message } from 'element-ui'
// 处理ajax频繁抛出错误 3秒内只显示一个错误信息
export function sendOut(msg) {
    if (!localStorage.ajax_oldTime) {
        localStorage.ajax_oldTime = new Date()
        // Message.error(msg)
    }
    if (((new Date() - new Date(localStorage.ajax_oldTime)) / 1000) > 3) {
        // Message.error(msg)
        localStorage.ajax_oldTime = new Date()
    }
}


// 处理ajax请求成功异常
export function catchAjaxResolve(response) {
    switch (response.data.code) {
        case 200:
            // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
            let data = null;
            if (response.data == undefined) {
                data = response.request.responseText
            } else {
                data = response.data
            }
            return Promise.resolve(data)
        case 401:
            // 弹出错误信息 看情况处理
            return false
        case 500:
            // 弹出错误信息 看情况处理
            return false
        default:
            return false
    }
}
// 处理ajax请求错误
export function catchAjaxReject(error) {
    switch (error.response.status) {
        case 401:
            sendOut('登陆失效')
            break
        case 404:
            sendOut('网络请求不存在')
            break
        case 504:
            sendOut('网页请求超时')
            break
            // 其他错误，直接抛出错误提示
        default:
            sendOut('网络异常')
    }
    return Promise.reject(error.response)
}
```
main.js添加
```
import Axios from '@/api'
Vue.prototype.$Axios = Axios
```
data/index
```
/**
 * @description ajax接口聚合
 * @author jie
 * @date 2019/8/16
 * @returns VOID
 * @version 1.0
 */
const files = require.context('./', false, /[^index.js]*\.js$/)
let modules = {}
files.keys().forEach((key) => {
    modules = {...modules, ...files(key).default || files(key)}
})
export default modules;
```
data/test.js, 这里推荐以模块分类命名，然后里面的接口xxx模块名_xxx功能
```
/**
 * @description 测试模块相关接口
 * @author jie
 * @date 2019/8/16
 * @returns VOID
 * @version 1.0
 */
export default {
    // 添加
    test_add: {
        url: '/api/save',
        interFaceType: 'api',
        method: 'post',
        bodyParam: true
    },
    // 删除
    test_delete: {
        url: '/api/delete',
        interFaceType: 'api',
        method: 'delete'
    },
    // 查询
    test_getList: {
        url: '/api/select',
        interFaceType: 'api',
        method: 'get',
        linkId: true
    },
    // 修改
    test_updateList: {
        url: '/api/update',
        interFaceType: 'api',
        method: 'put'
    },
}
```
## 七.添加moke.js模拟后端数据
添加依赖
```
npm install -D mockjs
```
添加mock文件夹，mock/index.js、mock/test.js文件目录如下
```
project
├── mock            +++++++++
│   ├── index.js    +++++++++        
│   └── test.js     +++++++++    
...
```
mack/index.js 
@注 Mock.mock( rurl, rtype, template ) rurl可以是字符串或者正则 为了避免get请求带有参数的情况下匹配失效尽量使用正则来匹配
传送门：[MockJS](https://github.com/nuysoft/Mock/wiki/Mock.mock()#mockmock-rurl-rtype-function-options--)

```
/**
 * @description moke接口聚合
 * @author jie
 * @date 2019/8/16
 * @returns VOID
 * @version 1.0
 */
// 引入mockjs
const Mock = require('mockjs');

const files = require.context('./', false, /[^index.js]*\.js$/)
let modules = {}
files.keys().forEach((key) => {
    modules = {...modules, ...files(key).default || files(key)}
})
for(let key in modules) {
    if(modules.hasOwnProperty(key)) {
        let obj = modules[key]
        obj.isMock && Mock.mock(new RegExp(obj.url + ".*"), obj.method, obj.fun); // Mock.mock( rurl, rtype, template ) rurl可以是字符串或者正则 为了避免get请求带有参数的情况下匹配失效尽量使用正则来匹配
}

export default modules;
```
mock/test.js, url: 需要模拟的接口路径，method: 对应的请求方法，fun模拟数据的函数，详细的可以去看mock的文档或者相关教程
isMock 一键开关，是否使用mock全在你一念之间
```
/**
 * @description mock测试模块相关接口
 * @author jie
 * @date 2019/8/16
 * @param { isMock } 是否启用mock数据
 * @returns VOID
 * @version 1.0
 */
// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
export default {
    // 查询
    test_getList: {
        url: '/api/select',
        method: 'get',
        isMock: true,
        fun: function() {
            let testData = []
            for (let i = 0; i < 100; i++) {
                let newArticleObject = {
                    title: Random.csentence(5, 30), //  随机生成5-30的中文句子
                    name: Random.cname(), // 随机生成一个常见的中文姓名
                    date: Random.date()  // 指示生成的日期字符串的格式,默认为yyyy-MM-dd
                }
                testData.push(newArticleObject)
            }
            console.log(testData)
            return {
                code: 200,
                data: testData
            };
        }
    },
    // 添加
    test_add: {
        url: '/api/save',
        method: 'get',
        isMock: false,
        fun: function() {
            let testData = []
            for (let i = 0; i < 100; i++) {
                let newArticleObject = {
                    title: Random.csentence(5, 30), //  随机生成5-30的中文句子
                    name: Random.cname(), // 随机生成一个常见的中文姓名
                    date: Random.date()  // 指示生成的日期字符串的格式,默认为yyyy-MM-dd
                }
                testData.push(newArticleObject)
            }
            console.log(testData)
            return {
                code: 200,
                data: testData
            };
        }
    },
}
```
src/main.js
```
// 引入mockjs
require('./mock')
```
views/index
```
  methods: {
    changeTheme(type) {
      setTheme(type)
    },
    async addList() {
      let json = {
        id: 10
      }
      const res = await this.$Axios("test_add", json)
      if(res) {
        console.log(res, "11")
      }
    },
    async deleteList() {
      let json = {
        name: "vue",
        id: 10
      }
      const res = await this.$Axios("test_delete", json)
      if(res) {
        console.log(res)
      }
    },
    async getList() {
      let json = {
        name: "vue",
        id: 10
      }
      const res = await this.$Axios("test_getList", json)
      if(res) {
        console.log(res, "111")
      }
    },
    async updateList() {
      let json = {
        name: "vue",
        id: 10
      }
      const res = await this.$Axios("test_updateList", json)
      if(res) {
        console.log(res)
      }
    },
  },
  mounted() {
      this.addList()
      this.deleteList()
      this.getList()
      this.updateList()
  }
```
控制台打印
![image.png](//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b01fa508a5ec4364839d90585f3c7a60~tplv-k3u1fbpfcp-zoom-1.image)
到这里mock数据就完成了
## 八.设置环境变量
安装依赖
```
npm i -S dotenv
```
根目录添加环境变量.env.development，.env.beta，.env.production文件

.env.development
```
ENV = 'development'
INTERFACE_NAME = 'test.com1'
```
.env.beta
```
INTERFACE_NAME = 'test.com2'
```
.env.production
```
INTERFACE_PATH = 'test.com3'
```
config/index.js修改
```
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
```
webpack.config.js
```
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const copyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
            filename: "bundle.js", // 打包后的文件命名
            publicPath: '/'
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
                    use: ['style-loader', 'css-loader']
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
            })
        ],
        stats: process.env.ENV === 'development' ? 'none': true
    }
}

```
package.json
```
  "scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack --env production",
    "build:beta": "webpack --env  beta"
  }
```
默认加载.env.development，如果需要加载其他则需要--env xxx 对应环境变量.env.xxx
mode有三个模式，减少了webpack大量的配置
![image.png](//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3d51d3044814813a6c7d1ca44ef3ce4~tplv-k3u1fbpfcp-zoom-1.image)
Mode: development
![image.png](//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab78a468547c4ecb8d3f91d177271256~tplv-k3u1fbpfcp-zoom-1.image)
Mode: production
![image.png](//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3142e4e66379441f9c660b82d7c94633~tplv-k3u1fbpfcp-zoom-1.image)
Mode: none 这个基本很少用
![image.png](//p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/02ebf806e2284a56a5c30911e96010e0~tplv-k3u1fbpfcp-zoom-1.image)
环境变量的核心是利用webpack更改mode变量的行为
```
var config = {
  entry: './app.js'
  //...
};

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};
```
webpack文档地址：[webpack配置](https://webpack.js.org/configuration/mode/#root)
到这里环境变量就初步配置完成了，后面还有一些webpack优化，兼容，缓存的东西
未完待续。。。这个项目会一直更新直到功能完善
项目源码：[vue-webpack4](https://github.com/LiveJie/vue-webpack4)

