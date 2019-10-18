<template>
  <form @submit.prevent="$emit('save', $event.target)">
    <div class="form-group">
      <label for="title">Заголовок</label>
      <input
        type="text"
        class="form-control"
        id="title"
        name="title"
        required
        v-model="post.title"
      >
    </div>
    <div class="form-group">
      <label for="description">Краткое описание</label>
      <input
        type="text"
        class="form-control"
        id="description"
        name="description"
        required
        v-model="post.description"
      >
    </div>
    <div class="form-group">
      <label for="text">Тект записи</label>
      <textarea
        class="form-control"
        id="text"
        name="body"
        rows="5"
        required
        v-model="post.body"
        >
      </textarea>
    </div>
    <button type="submit" class="btn btn-info">Сохранить</button>
  </form>
</template>

<script>

export default {
  name: 'PostForm',
  props: {
    post: {
      type: Object,
      required: false,
      default () {
        return {
          id : "",
          title : "",
          description: "",
          body : "",
        }
      }
    },
  },
};
</script>

<style scoped></style>
