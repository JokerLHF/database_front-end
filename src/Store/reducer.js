import { USER_MEAASGE } from './const';

const defaultState = {
  userMessage: {}, // 用户的信息
}
export default (state = defaultState, action) => {
  if (action.type === USER_MEAASGE) {
    state.userMessage = action.userInformation
  }
  return state
}
