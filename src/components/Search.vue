<template>
  <section class="search-container">
    <div>
      <h2>Services</h2>
      <KInput
        type="search"
        size="small"
        placeholder="Search"
        v-model="searchTerm"
      />
    </div>
    <div class="add-button-wrapper">
      <KButton appearance="primary" size="small" :isRounded="false"
        >Add New Service</KButton
      >
    </div>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import KInput from "@kongponents/kinput";
import KButton from "@kongponents/kbutton";

export default Vue.extend({
  name: "Search",
  components: {
    KInput,
    KButton,
  },
  data() {
    return {
      searchTerm: "",
    };
  },
  watch: {
    searchTerm(val) {
      this.$store.dispatch("search", val);
    },
  },
  methods: {},
});
</script>

<style lang="sass">
.search-container
    position: relative
    display: flex
    justify-content: space-between
    margin: 2.5rem 0
    text-align: left

    & div > h2
        margin-bottom: 1vh

    & .k-input
        border: 1px solid rgba(0, 0, 0, 0.1)!important
        padding-top: 5px!important
        padding-bottom: 5px!important
        padding-left: 35px!important

    & .k-button
        font-family: Avenir, Helvetica, Arial, sans-serif!important

    & .add-button-wrapper
        margin-right: 0.8rem
</style>