//init state
const state = () => ({
  userInfo: {},
});

//mutations
const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo;
  },
};
//getters
const getters = {
  getUserInfo: () => {
    return state.userInfo;
  },
};
//actions
const actions = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
