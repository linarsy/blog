import omit from 'lodash/omit';
import without from 'lodash/without';
import { posts } from '../../initData';

const state = {
  posts,
};

const getters = {
  postsById: state => state.posts.byId,
  postsIds: state => state.posts.allIds,
  posts: (state, getters) => {
    const { postsById, postsIds } = getters;
    return postsIds.map(id => postsById[id]).reverse();
  },
  postsByPage: (state, getters) => {
    const { itemsByPage, count } = state;
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
    const { posts: { byId, allIds } } = state;
    state.posts = {
      ...state.posts,
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
    localStorage.setItem('post', JSON.stringify(state.posts));
  },
  editPost (state, attributes) {
    const { posts: { byId, allIds } } = state;
    state.posts = {
      ...state.posts,
      byId: { ...byId, [attributes.id]: attributes },
      allIds,
    };
    localStorage.setItem('post', JSON.stringify(state.posts));
  },
  deletePost (state, id) {
    const { posts: { byId, allIds } } = state;
    state.posts = {
      byId: omit(byId, id),
      allIds: without(allIds, id),
    };
    localStorage.setItem('post', JSON.stringify(state.posts));
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
