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
