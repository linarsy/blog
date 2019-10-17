<template>
  <div class="row mt-5">
    <ul v-if="posts.length" class="col-4">
      <PostPreview
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </ul>
    <div class="col-8">
      <PostForm />
    </div>
  </div>
</template>

<script>
import PostPreview from './PostPreview';
import PostForm from './PostForm';

export default {
  components: {
    PostPreview,
    PostForm,
  },
  name: 'MainPage',
  computed: {
    posts () {
      const { postsInReverse } = this.$store.getters;
      return postsInReverse;
    },
  },
};
</script>

<style scoped></style>
