/**
 * @author 汤国栋 2018-09-06 11:05:11
 * @deprecated 桌面主页
 */
const TAB_CHANGE = 'desktop/tabChange';
const ACTIVE_KEY_CHANGE = 'desktop/activeKeyChange';

export const tabChange = tabs => ({ type: TAB_CHANGE, tabs });

export const activeKeyChange = activeKey => ({
  type: ACTIVE_KEY_CHANGE,
  activeKey,
});

export default (state = {}, action = {}) => {
  const { type, ...other } = action;
  switch (type) {
    case TAB_CHANGE: {
      return { ...state, ...other };
    }
    case ACTIVE_KEY_CHANGE: {
      return { ...state, ...other };
    }
    default:
      return state;
  }
};
