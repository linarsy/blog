<template>
  <div class="mt-5">
    <h3 class="mb-4">Добавьте новую запись</h3>
    <PostForm @save="createPost"/>
  </div>
</template>

<script>
import PostForm from './PostForm';

export default {
  components: {
    PostForm,
  },
  name: 'NewPostPage',
  methods: {
    createPost (form) {
      const formData = new FormData(form);
      const time = +new Date();
      let attributes = { id: `post${time}` };
      for(const pair of formData.entries()) {
        const [key, value] = pair;
        attributes = { ...attributes, [key]: value };
      }
      this.$store.commit('createPost', attributes);
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style scoped></style>
