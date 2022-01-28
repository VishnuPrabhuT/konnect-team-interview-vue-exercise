<template>
  <div id="app">
    <TopNav />

    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TopNav from "./components/TopNav.vue";

export default Vue.extend({
  name: "Home",
  components: {
    TopNav,
  },
  async created() {
    await this.$store.dispatch("getServices");
  },
});
</script>

<style lang="sass">
@import "./assets/sass/_variables.sass"

*
  padding: 0
  margin: 0
  box-sizing: border-box
  outline: none

body
  height: 100%
  overflow: hidden
  scrollbar-width: none
  max-width: 100vw
  max-height: 100vh

#app
  display: grid
  grid-template-rows: 5vh auto
  grid-template-columns: 1fr
  max-height: 100%
  width: 100%
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
</style>
