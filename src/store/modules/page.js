const state = {
  itemsByPage: 3,
  count: 1,
};

const getters = {
  lastPage: (state, getters, rootState, rootGetters) => {
    const { itemsByPage } = state;
    const postsIds = rootGetters['posts/postsIds'];
    return Math.ceil(postsIds.length / itemsByPage);
  },
};

const mutations = {
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
