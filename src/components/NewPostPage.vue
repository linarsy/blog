<template>
  <div class="mt-5">
    <h3 class="mb-4">Добавьте новую запись</h3>
    <PostForm @save="createPost"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import PostForm from './PostForm';

export default {
  components: {
    PostForm,
  },
  name: 'NewPostPage',
  methods: {
    ...mapActions('posts', {
      save: 'createPost',
    }),
    createPost (form) {
      const formData = new FormData(form);
      this.save(formData);
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style scoped></style>
