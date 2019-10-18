<template>
  <div class="row mt-5">
    <div class="col-6">
      <h3 class="mb-4">Последние записи</h3>
      <div v-if="posts.length">
        <PostPreview
          v-for="post in posts"
          :key="post.id"
          :post="post"
        />
      </div>
      <p v-else>Начните вести блог</p>
    </div>
    <div class="col-6">
      <h3 class="mb-4">Добавьте новую запись</h3>
      <PostForm @save="createPost"/>
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
      form.reset();
    },
  },
};
</script>

<style scoped></style>
