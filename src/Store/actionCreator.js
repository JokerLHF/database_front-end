import { USER_MEAASGE } from './const';
export const loginUserInformation = (userInformation) => ({
  //登陆的时候记录用户数据
  type: USER_MEAASGE,
  userInformation
})