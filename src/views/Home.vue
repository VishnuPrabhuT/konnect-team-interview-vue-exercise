<template>
  <main>
    <Search @toggleLoading="toggleLoading()" />
    <Catalog v-if="!loading" />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions, mapGetters } from "vuex";

import Search from "../components/Search.vue";
import Catalog from "../components/Catalog.vue";

import axios from "axios";

export default Vue.extend({
  name: "Home",
  components: {
    Search,
    Catalog,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState["loading"],
  },
  methods: {
    toggleLoading() {
      // this.$store.dispatch("toggleLoading");
    },
  },
});
</script>

<style lang="sass" scoped>
main
  width: 50vw
  margin: 0 auto
  max-height: 87vh
  overflow: hidden

@media screen and (max-width: 900px)
  main
    width: 75vw
</style>
