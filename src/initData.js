import data from './assets/data.json';

const getPosts = () => {
  const posts = JSON.parse(localStorage.getItem('post'));
  if (posts) return posts;
  return data.posts;
};

const getComments = () => {
  const comments = JSON.parse(localStorage.getItem('comment'));
  if (comments) return comments;
  return data.comments;
};

export const posts = getPosts();
export const comments = getComments();
