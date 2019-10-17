<template>
  <form v-on:submit.prevent="addComment">
    <div class="form-group">
      <label for="author">Представьтесь</label>
      <input
        type="text"
        class="form-control"
        id="author"
        name="author"
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
        v-model="text"
        >
      </textarea>
    </div>
    <button type="submit">Сохранить</button>
  </form>
</template>

<script>

export default {
  name: 'PostForm',
  props: {
    post: {
      type: String,
      required: true,
    }
  },
  data () {
    return {
      author: '',
      text: '',
    }
  },
  methods: {
    addComment (e) {
      const formData = new FormData(e.target);
      let attributes = { post: this.post};
      for(const pair of formData.entries()) {
        const [key, value] = pair;
        attributes = { ...attributes, [key]: value };
      }
      this.$store.commit('addComment', attributes)
      e.target.reset();
    },
  },
};
</script>

<style scoped></style>
