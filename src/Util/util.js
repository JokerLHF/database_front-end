let deepCopy = (values) => { // 深复制的函数, joker工具
  if (typeof values !== 'object' || values === null) { // 证明是普通的数据
    return;
  }
  let newValues = values.constructor === Array ? [] : {}; // 判断是对象还是数组
  for (let i in values) {
    let item = values[i];
    newValues[i] = (Object.prototype.toString.call(item) === '[object Object]') ? deepCopy(item) : item; // 是否值是引用类型， 是的话递归调用, 不是直接复制
  }
  return newValues;
}

Date.prototype.pattern = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, //小时
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度    
    "S": this.getMilliseconds() //毫秒    
  };
  var week = {
    "0": "\u65e5",
    "1": "\u4e00",
    "2": "\u4e8c",
    "3": "\u4e09",
    "4": "\u56db",
    "5": "\u4e94",
    "6": "\u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};

export default {
  deepCopy
}