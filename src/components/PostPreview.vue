<template>
  <router-link :to="{ name: 'post', params: { id: post.id }}">
    <div class="mb-3">
      <h5 class="mb-1">{{ post.title }}</h5>
      <p class="mb-1">{{ post.description }}</p>
      <small> комментарии: {{ comments.length }}</small>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'PostPreview',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    comments () {
      const { getCommentsByPost } = this.$store.getters;
      return getCommentsByPost(this.post.id);
    },
  },
};
</script>

<style scoped></style>
