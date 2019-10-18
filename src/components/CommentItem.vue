<template>
  <div class="mb-3">
    <b>{{comment.author}}</b>
    <p class="mb-3">{{comment.text}}</p>
    <button
      type="button"
      class="btn btn-info"
      @click="deleteComment"
    >
      Удалить
    </button>
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
  methods: {
    deleteComment () {
      this.$store.commit('deleteComment', this.comment.id)
    },
  },
};
</script>

<style scoped></style>
