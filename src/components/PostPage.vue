<template>
  <div>
    <PostItem
      class="mb-5"
      v-bind:post="post"
    />
    <h3>Комментарии:</h3>
    <CommentForm v-bind:post="id" />
    <div v-if="comments.length" class="my-5">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
      />
    </div>
  </div>
</template>

<script>
import PostItem from './PostItem';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

export default {
  components: {
    PostItem,
    CommentItem,
    CommentForm,
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
      return getCommentsByPost(this.id);
    },
  },
};
</script>

<style scoped></style>
