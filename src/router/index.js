import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '@/components/MainPage';
import PostPage from '@/components/PostPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name:"default",
      component: MainPage,
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostPage,
      props: true,
    }
  ]
});
