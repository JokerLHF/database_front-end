import { USER_MEAASGE, SEARCH_INFO, CHANGE_CURRENT, CHANGE_LOADING } from './const';
import Util from '../Util/util';

const defaultState = {
  userMessage: {}, // 用户的信息
  allSearchLimit: {}, // 搜索的条件 { id1: { 搜索条件 }, id2: { 搜索条件 }}
  allTableData: {}, // table表格的信息 { id1: { 表格数据, current, loading, total }, id2: { 表格数据, current, loading, total }}
  fixedConf: { // 默认的参数
    current: 1,
    size: 10
  }
}

let searchInfo = (action, state) => {
  let newSearchState = Util.deepCopy(state);
  let { searchLimit, tableData, path, total } = action;

  newSearchState.allSearchLimit[path] = { searchLimit };
  let table = newSearchState.allTableData;

  if (!table[path]) { // 如果不存在这个表的唯一id的对象
    table[path] = { tableData, total };
  } else {
    table[path].tableData = tableData;
    table[path].total = total;
  }
  return newSearchState;
}

let currentChange = (action, state) => {
  let currentState = Util.deepCopy(state);
  let { path, current } = action;
  let table = currentState.allTableData;
  if (!table[path]) { // 如果不存在这个表的唯一id的对象
    table[path] = { current }
  } else {
    table[path].current = current;
  }
  return currentState;
}

let loadingChange = (action, state) => {
  let loadingState = Util.deepCopy(state);
  let { path, loading } = action;
  let table = loadingState.allTableData;
  if (!table[path]) { // 如果不存在这个表的唯一id的对象
    table[path] = { loading }
  } else {
    table[path].loading = loading;
  }
  return loadingState;
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case USER_MEAASGE:
      let newState = Util.deepCopy(state);
      newState.userMessage = action.userInformation
      return newState;
    case SEARCH_INFO:
      let newSearchState = searchInfo(action, state);
      return newSearchState;
    case CHANGE_CURRENT:
      let currentState = currentChange(action, state);
      return currentState;
    case CHANGE_LOADING:
      let loadingState = loadingChange(action, state);
      return loadingState;
    default:
      return state;
  }
}
