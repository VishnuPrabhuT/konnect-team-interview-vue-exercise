<template>
  <div class="catalog-container">
    <template v-if="visibleServices.length > 0">
      <section class="catalog">
        <KCard
          v-for="service in visibleServices"
          :key="service.id"
          class="service"
        >
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
      </section>

      <Pagination
        class="pagination"
        :items="filteredServices"
        :initialPageSize="12"
        :totalCount="filteredServices.length"
        :disablePageJump="true"
        @pageChanged="
          ({ page, visibleItems }) => (visibleServices = visibleItems)
        "
      >
      </Pagination>
    </template>
    <template v-else>No services to show!</template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions, mapGetters } from "vuex";

import KCard from "@kongponents/kcard";

import Pagination from "./Pagination.vue";

export default Vue.extend({
  name: "Catalog",
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  components: {
    KCard,
    Pagination,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["services", "filteredServices", "visibleServices"]),
  },
  created() {
    console.log(this.services);
  },
});
</script>

<style lang="sass">
@import "../assets/sass/_colors.sass"

.catalog-container
  margin: 4vh 0

  & .page-size-select
    display: none

.catalog
  width: 100%
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))
  place-items: center
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
    color: $c_grey

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
        border: 1px solid $c_blue1
        color: $c_blue2

@media screen and (max-width: 900px)
  main
    & .service
      width: auto
</style>
