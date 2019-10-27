import omit from 'lodash/omit';
import without from 'lodash/without';
import { posts } from '../../initData';

const state = {
  items: posts,
};

const getters = {
  postsById: state => state.items.byId,
  postsIds: state => state.items.allIds,
  posts: (state, getters) => {
    const { postsById, postsIds } = getters;
    return postsIds.map(id => postsById[id]).reverse();
  },
  postsByPage: (state, getters, rootState) => {
    const { page: { itemsByPage, count } } = rootState;
    const { posts } = getters;
    const index = count - 1;
    return posts.slice(index * itemsByPage, index * itemsByPage + itemsByPage);
  },
  getPostById: (state, getters) => id => {
    const { postsById } = getters;
    return postsById[id];
  },
};

const mutations = {
  createPost (state, attributes) {
    const { items: { byId, allIds } } = state;
    state.items = {
      ...state.items,
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
    localStorage.setItem('post', JSON.stringify(state.items));
  },
  editPost (state, attributes) {
    const { items: { byId, allIds } } = state;
    state.items = {
      ...state.items,
      byId: { ...byId, [attributes.id]: attributes },
      allIds,
    };
    localStorage.setItem('post', JSON.stringify(state.items));
  },
  deletePost (state, id) {
    const { items: { byId, allIds } } = state;
    state.items = {
      byId: omit(byId, id),
      allIds: without(allIds, id),
    };
    localStorage.setItem('post', JSON.stringify(state.items));
  },
};

const actions = {
  createPost ({ commit }, formData) {
    const time = new Date();
    const attributes = {
      id: `post${+time}`,
      time,
    };
    for(const key of formData.keys()) {
      attributes[key] = formData.get(key);
    }
    commit('createPost', attributes);
  },
  editPost ({ commit }, formData) {
    const time = new Date();
    const attributes = {
      time,
    };
    for(const key of formData.keys()) {
      attributes[key] = formData.get(key);
    }
    commit('editPost', attributes);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
