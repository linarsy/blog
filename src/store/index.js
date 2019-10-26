import Vue from "vue";
import Vuex from "vuex";
import omit from 'lodash/omit';
import without from 'lodash/without';
import initData from '../initData';

Vue.use(Vuex);
const { posts, comments } = initData;

const state = {
  posts,
  comments,
  itemsByPage: 3,
  count: 1,
};

const getters = {
  postsById: state => state.posts.byId,
  postsIds: state => state.posts.allIds,
  posts: (state, getters) => {
    const { postsById, postsIds } = getters;
    return postsIds.map(id => postsById[id]).reverse();
  },
  lastPage: (state, getters) => {
    const { itemsByPage } = state;
    const { posts } = getters;
    return Math.ceil(posts.length / itemsByPage);
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
  commentsById: state => state.comments.byId,
  commentsIds: state => state.comments.allIds,
  comments: (state, getters) => {
    const { commentsById, commentsIds } = getters;
    return commentsIds.map(id => commentsById[id]);
  },
  getCommentsByPost: (state, getters) => id => {
    const { comments } = getters;
    return comments.filter(({ post }) => post === id);
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
  addComment (state, attributes) {
    const { comments: { byId, allIds } } = state;
    state.comments = {
      ...state.comments,
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
    localStorage.setItem('comment', JSON.stringify(state.comments));
  },
  deleteComment (state, id) {
    const { comments: { byId, allIds } } = state;
    state.comments = {
      byId: omit(byId, id),
      allIds: without(allIds, id),
    };
    localStorage.setItem('comment', JSON.stringify(state.comments));
  },
  increment (state) {
    state.count++
  },
  decrement (state) {
    state.count--
  }
};

const actions = {};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
