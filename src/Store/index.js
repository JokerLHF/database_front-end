import { createStore } from 'redux'
import reducer from './reducer' //引入笔记本
const store = createStore(
  reducer, //建立store,参数未reducer & 如果有扩展就是要扩展
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
) //把笔记本传递给store

export default store
