<template>
  <div>
    <b>{{comment.author}}</b>
    <p class="mb-1">{{comment.text}}</p>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
