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
      <div v-if="commentsByPost.length" class="my-5">
        <CommentItem
          v-for="comment in commentsByPost"
          :key="comment.id"
          :comment="comment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
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
    ...mapGetters('posts', [
      'getPostById',
    ]),
    ...mapGetters('comments', [
      'comments',
      'getCommentsByPost',
    ]),
    post () {
      return this.getPostById(this.id);
    },
    commentsByPost () {
      return this.getCommentsByPost(this.id);
    },
  },
  methods: {
    ...mapMutations('posts', {
      delete: 'deletePost',
    }),
    ...mapActions('posts', {
      save: 'editPost',
    }),
    editPost () {
      this.mode = 'edit';
    },
    deletePost () {
      this.delete(this.id);
      this.$router.push({ path: '/' });
    },
    savePost (form) {
      const formData = new FormData(form);
      formData.append('id', this.id);
      this.save(formData);
      this.mode = 'read';
    },
  },
};
</script>

<style scoped></style>