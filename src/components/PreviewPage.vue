<template>
  <div class="row mt-5">
    <ul v-if="posts.length" class="col-4">
      <PostPreview
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </ul>
    <p v-else>
      Начните вести блог.
    </p>
  </div>
</template>

<script>
import PostPreview from './PostPreview';

export default {
  components: {
    PostPreview,
  },
  name: 'PreviewPage',
  computed: {
    posts () {
      const { postsInReverse } = this.$store.getters;
      return postsInReverse;
    },
  },
};
</script>

<style scoped></style>
