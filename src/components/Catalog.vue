/* eslint-disable */
<template>
  <div class="catalog-container">
    <section class="search-container">
      <div>
        <h2>Services</h2>
        <KInput type="search" size="small" placeholder="Search" />
      </div>
      <div>
        <KButton appearance="primary" size="small" :isRounded="false"
          >Add New Service</KButton
        >
      </div>
    </section>
    <div class="catalog">
      <KCard v-for="service in services" :key="service.id" class="service">
        <template slot="title">
          {{ service.name }}
        </template>
        <template slot="body">
          <div class="service-text">
            {{
              service.description.length > 70
                ? service.description.substring(0, 70) + "..."
                : service.description
            }}
          </div>
          <div class="versions">
            <span>{{ service.versions.length }}</span> Versions
          </div>
        </template>
      </KCard>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import KCard from "@kongponents/kcard";
import KInput from "@kongponents/kinput";
import KButton from "@kongponents/kbutton";
import axios from "axios";

export default Vue.extend({
  name: "Catalog",
  components: {
    KCard,
    KInput,
    KButton,
  },
  data() {
    return {
      services: [],
      filteredServices: [],
      searchTerm: "",
    };
  },
  watch: {
    searchTerm(val) {
      console.log(val);
    },
  },
  mounted() {
    this.fetchServices();
  },
  methods: {
    fetchServices() {
      axios.get("/api/service_packages").then((res) => {
        this.services = res.data;
        this.filteredServices = res.data;
        console.log(res.data);
      });
    },
  },
});
</script>

<style lang="sass">
.catalog-container
  margin: 5vh 0

.search-container
  position: relative
  display: flex
  justify-content: space-between
  padding: 1rem 0
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

.catalog
  width: 100%
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))
  gap: 1% 0.5%

.service
  flex-basis: 20%
  display: flex
  flex-direction: column
  justify-content: space-evenly
  width: 215px
  height: 180px
  padding: 0.85rem 1rem
  border-radius: 5px!important

  &:hover
    cursor: pointer
    border: 1px solid #A6C6FF!important

  & .k-card-title
    text-align: left

    & h4
      width: 17ch
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      font-size: 16px
      font-weight: 500
      color: #1456CB!important

  & .k-card-body
    display: flex
    flex-direction: column
    justify-content: space-between
    height: 100%
    text-align: left
    color: rgba(0, 0, 0, 0.45)

    & .service-text
      width: 100%
      height: 65px
      font-size: 14px
      overflow: hidden
      text-overflow: ellipsis

    & .versions
      margin-top: 1rem
      font-size: 15px
      font-weight: 700
      color: rgba(0, 0, 0, 0.7)

      & span
        padding: 1px 12px
        font-weight: 500
        border-radius: 40px
        border: 1px solid #D9E7FF
        color: #1456CB

@media screen and (max-width: 900px)
  main
    & .service
      width: auto
</style>
