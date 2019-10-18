<template>
  <div class="mt-5">
    <router-link to="/new-post">
      <button
        type="button"
        class="btn btn-info block"
      >
        Добавить запись в блог
      </button>
    </router-link>
    <button
      type="button"
      class="btn btn-light ml-3"
      @click="previousPage"
      :disabled="count === 1"
    >
      Назад
    </button>
    <button
      type="button"
      class="btn btn-light ml-3"
      @click="nextPage"
      :disabled="count === lastPage"
    >
      Дальше
    </button>
    <div class="mt-5">
      <h3 class="mb-4">Последние записи</h3>
      <div v-if="posts.length">
        <p>Страница {{count}} из {{lastPage}}</p>
        <PostPreview
          v-for="post in selectedPosts"
          :key="post.id"
          :post="post"
        />
      </div>
      <p v-else>Начните вести блог</p>
    </div>
  </div>
</template>

<script>
import PostPreview from './PostPreview';

const itemsByPage = 3;

export default {
  components: {
    PostPreview,
  },
  name: 'MainPage',
  data () {
    return {
      count: 1,
    }
  },
  computed: {
    posts () {
      const { posts } = this.$store.getters;
      return posts;
    },
    selectedPosts () {
      const { getPostByPage } = this.$store.getters;
      return getPostByPage(this.count - 1, itemsByPage);
    },
    lastPage () {
      const lastPage = this.posts.length / itemsByPage;
      return Math.ceil(lastPage);
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
    previousPage () {
      this.count = this.count - 1;
    },
    nextPage () {
      this.count = this.count + 1;
    },
  },
};
</script>

<style scoped></style>
