let deepCopy = (values) => { // 深复制的函数, joker工具
  if (typeof values !== 'object') { // 证明是普通的数据
    return;
  }
  let newValues = values.constructor === Array ? [] : {}; // 判断是对象还是数组
  for (let i in values) {
    newValues[i] = (typeof values[i] === 'object' ? deepCopy(values[i]) : values[i]); // 是否值是引用类型， 是的话递归调用, 不是直接复制
  }
  return newValues;
}

export default {
  deepCopy
}