// 这里用的是elementUI 弹框提示
// import { Message } from 'element-ui'
// 处理ajax频繁抛出错误 3秒内只显示一个错误信息
export function sendOut(msg) {
    if (!localStorage.ajax_oldTime) {
        localStorage.ajax_oldTime = new Date()
        console.log(msg)
    }
    if (((new Date() - new Date(localStorage.ajax_oldTime)) / 1000) > 3) {
        console.log(msg)
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