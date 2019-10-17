<template>
  <form v-on:submit.prevent="addPost">
    <div class="form-group">
      <label for="title">Заголовок</label>
      <input
        type="text"
        class="form-control"
        id="title"
        name="title"
        v-model="title"
      >
    </div>
    <div class="form-group">
      <label for="description">Краткое описание</label>
      <input
        type="text"
        class="form-control"
        id="description"
        name="description"
        v-model="description"
      >
    </div>
    <div class="form-group">
      <label for="text">Тект записи</label>
      <textarea
        class="form-control"
        id="text"
        name="body"
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
  data () {
    return {
      title: '',
      description: '',
      text: '',
    }
  },
  methods: {
    addPost (e) {
      const formData = new FormData(e.target);
      let attributes = {};
      for(const pair of formData.entries()) {
        const [key, value] = pair;
        attributes = { ...attributes, [key]: value };
      }
      this.$store.commit('addMessage', attributes)
      e.target.reset();
    },
  },
};
</script>

<style scoped></style>
