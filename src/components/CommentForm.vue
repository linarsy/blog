<template>
  <form @submit.prevent="addComment">
    <div class="form-group">
      <label for="author">Представьтесь</label>
      <input
        type="text"
        class="form-control"
        id="author"
        name="author"
        required
        v-model="author"
      >
    </div>
    <div class="form-group">
      <label for="text">Ваш комментарий</label>
      <textarea
        class="form-control"
        id="text"
        name="text"
        rows="3"
        required
        v-model="text"
        >
      </textarea>
    </div>
    <button type="submit" class="btn btn-info">Сохранить</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'PostForm',
  props: {
    post: {
      type: String,
      required: true,
    },
  },
  data () {
    return {
      author: '',
      text: '',
    }
  },
  methods: {
    ...mapActions('comments', {
      save: 'addComment',
    }),
    addComment (e) {
      const formData = new FormData(e.target);
      formData.append('post', this.post);
      this.save(formData);
      e.target.reset();
    },
  },
};
</script>

<style scoped></style>
