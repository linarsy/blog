const state = {
  itemsByPage: 3,
  count: 1,
};

const getters = {
  lastPage: (state, getters) => {
    const { itemsByPage } = state;
    const { posts } = getters;
    return Math.ceil(posts.length / itemsByPage);
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
