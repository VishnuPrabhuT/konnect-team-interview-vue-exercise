/* eslint-disable */
<template>
  <main>
    <Catalog />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Catalog from "../components/Catalog.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Catalog,
  },
});
</script>

<style lang="sass" scoped>
main
  width: 50vw
  margin: 0 auto
  max-height: 85vh
  overflow: hidden

@media screen and (max-width: 900px)
  main
    width: 75vw
</style>
