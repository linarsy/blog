<template>
  <div class="mb-3">
    <b>{{comment.author}}</b>
    <p class="mb-3">{{comment.text}}</p>
    <button
      type="button"
      class="btn btn-info"
      @click="deleteComment(comment.id)"
    >
      Удалить
    </button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations([
      'deleteComment',
    ]),
  },
};
</script>

<style scoped></style>
