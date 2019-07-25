import axios from 'axios';
import { message } from 'antd';
axios.defaults.withCredentials = true //让ajax携带cookie
let _fetch = function (options) {
  //使用qs的库
  const qs = require('qs');
  const baseURL = 'https://easy-mock.com/mock/5cb6e6e3270aa324bd519b60/topview'
  let data = options.headers ? options.data : qs.stringify(options.data),
    headers = options.headers ? options.headers : { "Content-Type": 'application/x-www-form-urlencoded' }
  return new Promise((resolve, reject) => {
    axios({
      url: options.url,
      method: options.type,
      baseURL: baseURL,
      data, //如果传入optios.header, 就不把数据转为表单的形式， 使用传过来的data
      headers, // 默认使用表单的形式提交, 可以自行传入表头
    }).then(response => {
      if (response.data.code === 910) {
        // info('未登录');
        window.location.href = '/';
        reject(response);
      } else {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response.data);
          message.error('操作失败')
        }
      }
    })
  })
}
export default _fetch









// import { Toast } from 'antd-mobile';
// import host from '@/api'
// import * as statusCode from '../api/statusCode'
//
// ele.$notify 用于提示
// import ele from '../main'
// 默认请求头
// var headers = {
//   'Content-Type': 'application/x-www-form-urlencoded'
//   // 'Cookie': document.cookie
// }
// const instance = axios.create({
//   withCredentials: true,    // 开启这个配置项才可以接受服务器端发送的cookies
//   // 测试：http://120.24.12.171:8091  上线（不要合闸啦！）：http://120.24.12.171:9091
//   // baseURL: 'http://112.74.115.128:8040/auth',   //用于本地调试，要跨域访问后台接口的话可以在这里通过引入config配置host和端口
//   // baseURL: 'http://112.74.115.128:8040'
//   baseURL: 'https://easy-mock.com/mock/5cb6e6e3270aa324bd519b60/topview', // mock测试的接口
// })


// //增加get
// const methodList = ['post', 'put', 'patch']

// /**
//  *
//  * @param {传入的参数}
//  * 用于将参数从对象转化成qs
//  */
// const stringifyData = (data) => {
//   let res = []
//   Object.keys(data).forEach((key) => {
//     if (data[key] === null || data[key] === undefined) {
//       // 呵呵
//     } else {
//       res.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
//     }
//   })
//   return res.join('&')
// }

// /**
//  * [_fetch 用于http请求]
//  * @param  {[type]} option [传入配置参数，用法类似 $.ajax]
//  * @return {[type]}        [返回promise对象，用then方法获取返回的数据]
//  *
//  * 用法：
//  * import _fetch from '../util/Fetch'
//  *
//  * _fetch({
//  *   url: '后台接口',
//  *   type: 'post',
//  *   headers: {
//  *      'Content-Type': 'application/json'  //跟换请求头
//  *   },                                    //headers可写可不写
//  *   data: {
//  *     aid: 'edV03139DEaa',
//  *     b: 1,
//  *     c: 'hhh'
//  *   }
//  * })
//  * .then((res) => {
//  *   console.log(res.data)
//  * })
//  * .catch((err) => {
//  *   // 捕获错误(可选)
//  * })
//  */
// const _fetch = (option) => {
//   if (!option.url) {
//     console.error('使用_fetch时请先填入url')
//     return
//   }

//   let requestPromise

//   methodList.forEach((method) => {
//     if (option.type && option.type.toLowerCase() === method) {
//       var finalData = {}

//       // 如果_fetch请求有带请求头,则覆盖原来的默认请求头    
//       if (option.headers) {
//         headers = option.headers
//         // 如果请求是application/json,则把对象转为json字符串
//         if (headers['Content-Type'] === 'application/json') {
//           finalData = option.data ? JSON.stringify(option.data) : {}
//           console.log(finalData)
//         }

//         //如果请求是multipart/form-data，则把json对象转换为formData对象,当然也可以直接发
//         if (headers['Content-Type'] === 'multipart/form-data') {
//           if (option.data) {
//             if (Object.prototype.toString.call(option.data) == '[object FormData]') {
//               finalData = option.data
//             } else {
//               var formData = new FormData();
//               Object.keys(option.data).map((key) => {
//                 formData.append(key, option.data[key]);
//               })
//               finalData = formData
//             }
//           }
//         }
//       } else {
//         headers = {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//         finalData = option.data ? stringifyData(option.data) : {}
//       }
//       requestPromise = instance.request({
//         headers: headers,
//         url: option.url,
//         method: option.type.toLowerCase(),
//         data: finalData
//       })
//     }
//   })

//   //除了那三种方法之外的方法
//   if (!requestPromise) {
//     var finalData = option.data
//     if (headers['Content-Type'] === 'multipart/form-data') {
//       var formData = new FormData();
//       if (option.data) {
//         Object.keys(option.data).map((key) => {
//           formData.append(key, option.data[key]);
//         })
//         finalData = formData
//       }
//     }

//     let type = option.type || 'get'
//     type = type.toLowerCase()
//     requestPromise = instance.request({
//       url: option.url,
//       method: type,
//       params: finalData || {}
//     })
//   }

//   return requestPromise.then(
//     (res) => {
//       // console.log(typeof(res))
//       // console.log(res)
//       // let resJson = JSON.parse(res)
//       if (res.data.success) {
//         return res
//       } else {
//         // ele.$message.error({
//         //   title: '警告',
//         //   message: res.data.message
//         // })
//         // Toast.fail(res.data.message, 1);
//       }
//     }
//   )
// }

// export default _fetch
