<template>
  <div id="app">
    <app-main></app-main>
  </div>
</template>

<script>
  // import Header from './components/Header.vue'
  import Main from './components/Main.vue'

  export default {
    name: 'App',
    components: {
      // 'app-header': Header,
      'app-main': Main
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
