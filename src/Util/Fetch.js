import axios from 'axios';
import { message } from 'antd';
// axios.defaults.withCredentials = true //让ajax携带cookie
let _fetch = function (options) {
  const baseURL = 'http://120.79.191.54:8089/'
  let data = changeData(options);
  return new Promise((resolve, reject) => {
    axios({
      url: options.url,
      method: options.type,
      baseURL: baseURL,
      data,
      headers: options.headers,
      responseType: options.responseType ? options.responseType : 'json'
    }).then(response => {
      const { status, data, } = response;
      if (data.code === 910) { // 未登录的情况
        window.location.href = '/';
        reject(response);
      } else {
        if (status >= 200 && status <= 300) {
          resolve(data);
        } else {
          reject(data);
          message.error('操作失败')
        }
      }
    })
  })
}

let resToformData = (data) => {  // 转换为formData发送给后台
  var formData = new FormData();
  if (data) {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    })
  } else {
    return;
  }
  return formData;
}

let judgeHeader = (options) => {  // 判断请求头， 默认返回json
  const { headers } = options;
  let head = { 'Content-Type': 'application/json', }
  if (!headers) { // 没有请求头的
    options.headers = head;
  } else if (headers && !headers['Content-Type']) { // 有请求头， 不过没有content-type
    options.headers['Content-type'] = 'application/json';
  }
  return options.headers['Content-Type'];
}

let changeData = (options) => {
  const { data = '' } = options;
  let contentType = judgeHeader(options);
  let resData;
  switch (contentType) {
    case 'application/json':
      resData = JSON.stringify(data);
      break;
    case 'application/x-www-form-urlencoded':
    case 'multipart/form-data':
      resData = resToformData(data);
      break;
    default:
      break;
  }
  return resData;
}
export default _fetch


