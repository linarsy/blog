import Vue from "vue";
import Vuex from "vuex";
import intersection from 'lodash/intersection';
import initData from '../initData';

Vue.use(Vuex);
const { posts, comments, users } = initData;

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
    addMessage (state, attributes) {
      const { posts: { byId, allIds } } = state;
      const time = +new Date();
      attributes = { ...attributes, id: `post${time}` };
      return state.posts = {
        ...state.posts,
        byId: { ...byId, [attributes.id]: attributes },
        allIds: [...allIds, attributes.id],
      };
    },
    addComment (state, attributes) {
      const { comments: { byId, allIds } } = state;
      const time = +new Date();
      attributes = { ...attributes, id: `comment${time}` };
      return state.comments = {
        ...state.comments,
        byId: { ...byId, [attributes.id]: attributes },
        allIds: [...allIds, attributes.id],
      };
    },
  },
  actions: {}
});
