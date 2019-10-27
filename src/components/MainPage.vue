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
      <div v-if="postsIds.length">
        <p>Страница {{count}} из {{lastPage}}</p>
        <PostPreview
          v-for="post in postsByPage"
          :key="post.id"
          :post="post"
        />
      </div>
      <p v-else>Начните вести блог</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import PostPreview from './PostPreview';

export default {
  components: {
    PostPreview,
  },
  name: 'MainPage',
  computed: {
    ...mapState('page', [
      'count',
    ]),
    ...mapGetters('page', [
      'lastPage',
    ]),
    ...mapGetters('posts', [
      'postsIds',
      'postsByPage',
    ]),
  },
  methods: {
    ...mapMutations('page', {
      nextPage: 'increment',
      previousPage: 'decrement',
    }),
  },
};
</script>

<style scoped></style>
