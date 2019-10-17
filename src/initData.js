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

const getUsers = () => {
  const users = JSON.parse(localStorage.getItem('user'));
  if (users) return users;
  return data.users;
};

export default {
  posts: getPosts(),
  comments: getComments(),
  users: getUsers(),
};
