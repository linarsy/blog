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
    postsInReverse: (state, getters) => {
      const { postsById, postsIds } = getters;
      return postsIds.map(id => postsById[id]).reverse();
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
      return state.posts = {
        ...state.posts,
        byId: { ...byId, [attributes.id]: attributes },
        allIds: [...allIds, attributes.id],
      };
    },
    editPost (state, attributes) {
      const { posts: { byId, allIds } } = state;
      return state.posts = {
        ...state.posts,
        byId: { ...byId, [attributes.id]: attributes },
        allIds,
      };
    },
    deletePost (state, id) {
      const { posts: { byId, allIds } } = state;
      return state.posts = {
        byId: omit(byId, id),
        allIds: without(allIds, id),
      };
    },
    addComment (state, attributes) {
      const { comments: { byId, allIds } } = state;
      return state.comments = {
        ...state.comments,
        byId: { ...byId, [attributes.id]: attributes },
        allIds: [...allIds, attributes.id],
      };
    },
    deleteComment (state, id) {
      const { comments: { byId, allIds } } = state;
      return state.comments = {
        byId: omit(byId, id),
        allIds: without(allIds, id),
      };
    },
  },
  actions: {}
});
