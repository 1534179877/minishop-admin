import { createStore } from 'vuex';
import user from './modules/user';
// vuex状态管理
export default createStore({
  modules: {
    user,
  },
});
