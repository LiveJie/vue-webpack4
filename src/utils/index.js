/* eslint-disable */
/**
 * @description 工具类文件夹
 * @author jie
 * @param { type } 主题类型
 * @param { isCache } 是否缓存
 * @returns  random int
 */
function setTheme(type, isCache = false) {
    isCache && localStorage.setItem("WINDOWS_THEME", type)
    window.document.documentElement.setAttribute('data-theme', type)
}

export {
    setTheme
}