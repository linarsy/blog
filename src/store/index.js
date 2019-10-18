import Vue from "vue";
import Vuex from "vuex";
import omit from 'lodash/omit';
import without from 'lodash/without';
import initData from '../initData';

Vue.use(Vuex);
const { posts, comments } = initData;

export default new Vuex.Store({
  state: {
    posts,
    comments,
  },
  getters: {
    postsById: state => state.posts.byId,
    postsIds: state => state.posts.allIds,
    posts: (state, getters) => {
      const { postsById, postsIds } = getters;
      return postsIds.map(id => postsById[id]).reverse();
    },
    getPostByPage: (state, getters) => (page, itemsByPage) => {
      const { posts } = getters;
      return posts.slice(page * itemsByPage, page * itemsByPage + itemsByPage);
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
  },
  mutations: {
    createPost (state, attributes) {
      const { posts: { byId, allIds } } = state;
      state.posts = {
        ...state.posts,
        byId: { ...byId, [attributes.id]: attributes },
        allIds: [...allIds, attributes.id],
      };
      localStorage.setItem('post', JSON.stringify(state.posts));
      return state.posts;
    },
    editPost (state, attributes) {
      const { posts: { byId, allIds } } = state;
      state.posts = {
        ...state.posts,
        byId: { ...byId, [attributes.id]: attributes },
        allIds,
      };
      localStorage.setItem('post', JSON.stringify(state.posts));
      return state.posts;
    },
    deletePost (state, id) {
      const { posts: { byId, allIds } } = state;
      state.posts = {
        byId: omit(byId, id),
        allIds: without(allIds, id),
      };
      localStorage.setItem('post', JSON.stringify(state.posts));
      return state.posts;
    },
    addComment (state, attributes) {
      const { comments: { byId, allIds } } = state;
      state.comments = {
        ...state.comments,
        byId: { ...byId, [attributes.id]: attributes },
        allIds: [...allIds, attributes.id],
      };
      localStorage.setItem('comment', JSON.stringify(state.comments));
      return state.comments;
    },
    deleteComment (state, id) {
      const { comments: { byId, allIds } } = state;
      state.comments = {
        byId: omit(byId, id),
        allIds: without(allIds, id),
      };
      localStorage.setItem('comment', JSON.stringify(state.comments));
      return state.comments;
    },
  },
  actions: {}
});
