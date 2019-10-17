<template>
  <div class="mb-3">
    <h5 class="mb-1">{{ post.title }}</h5>
    <b class="mb-1">{{ post.description }}</b>
    <p> {{ post.body }}</p>
  </div>
</template>

<script>
export default {
  name: 'PostDetails',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
