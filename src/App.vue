<template>
  <div id="app">
    <NavBar />
    <div class="container my-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'app',
  components: {
    NavBar
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
