<template>
  <div>
    <h3 class="mb-4">{{ post.title }}</h3>
    <p> {{ post.body }}</p>
    <button
      type="button"
      class="btn btn-info"
      @click="$emit('edit')"
    >
      Редактировать
    </button>
    <button
      type="button"
      class="btn btn-info ml-3"
      @click="$emit('delete')"
    >
      Удалить
    </button>
  </div>
</template>

<script>
export default {
  name: 'PostItem',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
