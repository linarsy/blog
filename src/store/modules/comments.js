import omit from 'lodash/omit';
import without from 'lodash/without';
import { comments } from '../../initData';

const state = {
  items: comments,
};

const getters = {
  commentsById: state => state.items.byId,
  commentsIds: state => state.items.allIds,
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
    const { items: { byId, allIds } } = state;
    state.items = {
      ...state.items,
      byId: { ...byId, [attributes.id]: attributes },
      allIds: [...allIds, attributes.id],
    };
    localStorage.setItem('comment', JSON.stringify(state.items));
  },
  deleteComment (state, id) {
    const { items: { byId, allIds } } = state;
    state.items = {
      byId: omit(byId, id),
      allIds: without(allIds, id),
    };
    localStorage.setItem('comment', JSON.stringify(state.items));
  },
};

const actions = {
  addComment ({ commit }, formData) {
    const time = new Date();
    const attributes = {
      id: `comment${+time}`,
      time,
    };
    for(const key of formData.keys()) {
      attributes[key] = formData.get(key);
    }
    commit('addComment', attributes);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
