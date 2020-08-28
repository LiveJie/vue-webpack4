/* eslint-disable */
/**
 * @author jie
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
  console.log(config, "config")
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