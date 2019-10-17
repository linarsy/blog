<template>
  <div>
    <b>{{user.name}}</b>
    <p class="mb-1">{{comment.text}}</p>
  </div>
</template>

<script>
export default {
  name: 'PostComment',
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  computed: {
    user () {
      const  { getUserById } = this.$store.getters;
      const  { author } = this.comment;
      return getUserById(author);
    },
  },
};
</script>

<style scoped></style>
