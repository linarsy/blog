import Vue from 'vue';
import Router from 'vue-router';
import PreviewPage from '@/components/PreviewPage';
import PostPage from '@/components/PostPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name:"default",
      component: PreviewPage,
    },
    {
      path: '/post/:id',
      name: 'post',
      component: PostPage,
      props: true,
    }
  ]
});
