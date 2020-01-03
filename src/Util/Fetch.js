import axios from 'axios';
import { message } from 'antd';
// axios.defaults.withCredentials = true //让ajax携带cookie
let _fetch = function (options) {
  const baseURL = 'http://localhost:3000/'
  return new Promise((resolve, reject) => {
    axios({
      url: options.url,
      method: options.type,
      baseURL: baseURL,
      data: JSON.stringify(options.data),
      headers: { 'Content-Type': 'application/json' },
      responseType:  'json'
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

export default _fetch


