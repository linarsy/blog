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
    users,
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
    getCommentsByPost: (state, getters) => ids => {
      const { commentsById, commentsIds } = getters;
      return intersection(ids, commentsIds).map(id => commentsById[id]);
    },
    usersById: state => state.users.byId,
    getUserById: (state, getters) => id => {
      const { usersById } = getters;
      return usersById[id];
    },
  },
  mutations: {},
  actions: {}
});
