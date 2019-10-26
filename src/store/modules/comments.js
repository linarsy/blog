import omit from 'lodash/omit';
import without from 'lodash/without';
import { comments } from '../../initData';

const state = {
  comments,
};

const getters = {
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
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
