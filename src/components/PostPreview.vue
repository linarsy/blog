<template>
  <router-link :to="{ name: 'post', params: { id: post.id }}">
    <div class="mb-3">
      <h5 class="mb-1">{{ post.title }}</h5>
      <p class="mb-1">{{ post.description }}</p>
      <small> комментарии: {{ commentsByPost.length }}</small>
    </div>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PostPreview',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      'comments',
    ]),
    commentsByPost () {
      return this.comments.filter(({ post }) => post === this.post.id);
    },
  },
};
</script>

<style scoped></style>
