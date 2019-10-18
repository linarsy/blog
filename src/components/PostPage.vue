<template>
  <div>
    <div v-if="mode === 'read'">
      <PostItem
        :post="post"
        @edit="editPost"
        @delete="deletePost"
      />
    </div>
    <div v-else>
      <PostForm
        :post="post"
        @save="savePost"
      />
    </div>
    <div class="mt-5">
      <h4 class="mb-3">Комментарии:</h4>
      <CommentForm :post="id" />
      <div v-if="comments.length" class="my-5">
        <CommentItem
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PostItem from './PostItem';
import PostForm from './PostForm';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

export default {
  components: {
    PostItem,
    PostForm,
    CommentItem,
    CommentForm,
  },
  name: 'PostPage',
  data () {
    return {
      mode: 'read',
    }
  },
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
  methods: {
    editPost () {
      this.mode = 'edit'
    },
    deletePost () {
      this.$store.commit('deletePost', this.post.id);
      this.$router.push({ path: '/' });
    },
    savePost (form) {
      const formData = new FormData(form);
      let attributes = { id: this.id };
      for(const pair of formData.entries()) {
        const [key, value] = pair;
        attributes = { ...attributes, [key]: value };
      }
      this.$store.commit('editPost', attributes);
      this.mode = 'read';
    },
  },
};
</script>

<style scoped></style>
