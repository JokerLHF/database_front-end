import { USER_MEAASGE, SEARCH_INFO, CHANGE_CURRENT, CHANGE_LOADING } from './const';


/*
* 登陆的时候记录用户数据
*/
export const loginUserInformation = (userInformation) => ({
  type: USER_MEAASGE,
  userInformation
})

/*
* 路由以及markId组成的唯一标识。
* 点击搜索时的搜索信息， 
* 根据搜索条件从后台获取到数据
* 表格数据总数
*/

export const searchLimitAndResData = (path, searchLimit, tableData, total) => ({
  type: SEARCH_INFO,
  path,
  total,
  searchLimit,
  tableData
})

/*
* 路由和markID组成的唯一标识
* 当前的current
*/
export const changeCurrent = (path, current) => ({
  type: CHANGE_CURRENT,
  path,
  current,
})

/*
* 路由和markID组成的唯一标识
* 是否展示loading
*/
export const loadingChange = (path, loading) => ({
  type: CHANGE_LOADING,
  path,
  loading
})

