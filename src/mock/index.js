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
        // Mock.mock( rurl, rtype, template ) rurl可以是字符串或者正则 为了避免get请求带有参数的情况下匹配失效尽量使用正则来匹配
        obj.isMock && Mock.mock(new RegExp(obj.url + ".*"), obj.method, obj.fun); 
    }
}

export default modules;
