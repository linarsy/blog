<template>
  <div>
    <PostDetails
      v-bind:post="post"
    />
    <h3>Комментарии:</h3>
    <PostComment
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>

<script>
import PostDetails from './PostDetails';
import PostComment from './PostComment';

export default {
  components: {
    PostDetails,
    PostComment,
  },
  name: 'PostPage',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    post () {
      const { getPostById } = this.$store.getters;
      return getPostById(this.id);
    },
    comments () {
      const { getCommentsByPost } = this.$store.getters;
      const { comments } = this.post;
      return getCommentsByPost(comments);
    },
  },
};
</script>

<style scoped></style>
