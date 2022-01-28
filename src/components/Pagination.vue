<template>
  <nav aria-label="Pagination Navigation" data-testid="k-pagination-container">
    <div class="card-pagination-bar">
      <ul class="pagination-button-container">
        <li
          :class="{ disabled: backDisabled }"
          class="pagination-button circle"
          data-testid="prev-btn"
          @click.prevent="pageBack"
        >
          <a href="#" aria-label="Go to the previous page">
            <div class="kong-icon kong-icon-arrowLeft"></div>
          </a>
        </li>
        <li
          v-if="!disablePageJump && firstDetached"
          class="pagination-button"
          data-testid="page-1-btn"
        >
          <a
            href="#"
            aria-label="Go to the first page"
            @click.prevent="changePage(1)"
          >
            1
          </a>
        </li>
        <li
          v-if="!disablePageJump && firstDetached"
          class="pagination-button placeholder"
        >
          ...
        </li>
        <li
          v-for="page in pagesVisible"
          :key="page"
          :class="{ active: page == currentlySelectedPage }"
          :data-testid="`page-${page}-btn`"
          class="pagination-button"
        >
          <a
            :aria-label="`Go to page ${page}`"
            :aria-current="page == currentlySelectedPage && 'page'"
            href="#"
            @click.prevent="changePage(page)"
          >
            {{ page }}
          </a>
        </li>
        <li
          v-if="!disablePageJump && lastDetached"
          class="pagination-button placeholder"
        >
          ...
        </li>
        <li v-if="!disablePageJump && lastDetached" class="pagination-button">
          <a
            href="#"
            aria-label="Go to the last page"
            data-testid="last-btn"
            @click.prevent="changePage(pageCount)"
          >
            {{ pageCount }}
          </a>
        </li>
        <li>
          <span class="pagination-text" data-testid="visible-items">
            <span class="pagination-text-pages">{{ pagesString }}</span>
            {{ pageCountString }}
          </span>
        </li>
        <li
          :class="{ disabled: forwardDisabled }"
          class="pagination-button circle"
          data-testid="next-btn"
          @click.prevent="pageForward"
        >
          <a href="#" aria-label="Go to the next page">
            <div class="kong-icon kong-icon-arrowRight"></div>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import KSelect from "@kongponents/kselect/KSelect.vue";

export default {
  name: "KPagination",
  components: {
    KSelect,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    pageSizes: {
      type: Array,
      default: () => [15, 25, 50, 75, 100],
      validator: (pageSizes) =>
        pageSizes.length && pageSizes.every((i) => typeof i === "number"),
    },
    initialPageSize: {
      type: Number,
      default: null,
    },
    neighbors: {
      type: Number,
      default: 1,
    },
    searchTriggered: {
      type: Boolean,
      default: false,
    },
    currentPage: {
      type: Number,
      default: null,
    },
    disablePageJump: {
      type: Boolean,
      default: false,
    },
    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const currPage = this.currentPage ? this.currentPage : 1;
    const currentPageSize = this.initialPageSize
      ? this.initialPageSize
      : this.pageSizes[0];
    const pageCount = Math.ceil(this.totalCount / currentPageSize);

    const pageSizeOptions = this.pageSizes.map((size, i) => ({
      label: `${size}`,
      key: `size-${i}`,
      value: size,
    }));

    return {
      kpopAttrs: {
        placement: "top",
      },
      currPage,
      currentPageSize,
      pageCount,
      pageSizeOptions,
      backDisabled: currPage === 1,
      forwardDisabled: currPage === pageCount,
      pageSizeText: "",
      pagesVisible: this.getVisiblePages(
        this.currentlySelectedPage,
        pageCount,
        false,
        pageCount > 5 + 2 * this.neighbors
      ),
      firstDetached: false,
      lastDetached: pageCount > 5 + 2 * this.neighbors,
    };
  },
  computed: {
    startCount() {
      return (this.currPage - 1) * this.currentPageSize + 1;
    },
    endCount() {
      let calculatedEndCount = this.startCount - 1 + this.currentPageSize;

      return calculatedEndCount > this.totalCount
        ? this.totalCount
        : calculatedEndCount;
    },
    pagesString() {
      return `${this.startCount} to ${this.endCount}`;
    },
    pageCountString() {
      return ` of ${this.totalCount}`;
    },
    currentlySelectedPage() {
      if (this.currentPage) {
        return this.currentPage;
      } else {
        return this.currPage;
      }
    },
  },
  watch: {
    searchTriggered(newval) {
      if (newval === true) {
        this.returnToFirstPage();
      }
    },
    currentPage(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.changePage(newVal);
      }
    },
  },
  methods: {
    pageForward() {
      if (this.forwardDisabled) {
        return;
      }

      this.currPage++;
      this.updatePage();
    },
    pageBack() {
      if (this.backDisabled) {
        return;
      }

      this.currPage--;
      this.updatePage();
    },
    changePage(page) {
      this.currPage = page;
      this.updatePage();
    },
    updatePage() {
      const lastEntry =
        (this.currPage - 1) * this.currentPageSize + this.currentPageSize;

      this.forwardDisabled = lastEntry >= this.totalCount;
      this.backDisabled = this.currPage === 1;

      // The view will hold
      // Selected page, first page, last page, 2 placeholders and 2 * neighbors
      const visiblePages = 5 + 2 * this.neighbors;

      if (this.pageCount <= visiblePages) {
        // All pages will fit in screen
        this.firstDetached = false;
        this.lastDetached = false;
      } else {
        this.firstDetached = this.currPage >= this.neighbors + 4;
        this.lastDetached =
          this.currPage <= this.pageCount - this.neighbors - 3;
      }

      this.pagesVisible = this.getVisiblePages();

      this.$emit("pageChanged", {
        page: this.currPage,
        pageCount: this.pageCount,
        firstItem: this.startCount,
        lastItem: this.endCount,
        visibleItems: this.items.slice(this.startCount - 1, this.endCount),
      });
    },
    updatePageSize(event) {
      this.currentPageSize = event.value;
      this.pageSizeText = this.currentPageSize + " items per page";
      this.pageCount = Math.ceil(this.totalCount / this.currentPageSize);

      this.$emit("pageSizeChanged", {
        pageSize: this.currentPageSize,
        pageCount: this.pageCount,
      });

      if (this.currentPage !== 1) {
        this.changePage(1);
      }
    },
    getVisiblePages(
      currPage = this.currPage,
      pageCount = this.pageCount,
      firstDetached = this.firstDetached,
      lastDetached = this.lastDetached
    ) {
      if (this.disablePageJump) {
        return 0;
      }

      let pages = [...Array(pageCount).keys()].map((n) => n + 1);

      const visiblePages = 5 + 2 * this.neighbors;
      // All pages fit on one screen
      if (pages.length <= visiblePages) {
        return pages;
      }

      if (!firstDetached) {
        // First pages
        pages = pages.filter((n) => n <= this.neighbors * 2 + 3);
      } else if (firstDetached && lastDetached) {
        // Middle pages (if they do not fit on one screen)
        pages = pages.filter(
          (n) =>
            n > currPage - this.neighbors - 1 &&
            n < currPage + this.neighbors + 1
        );
      } else if (firstDetached && !lastDetached) {
        // Last pages
        pages = pages.filter((n) => n > pageCount - this.neighbors * 2 - 3);
      }

      return pages;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@kongponents/styles/variables";

.card-pagination-bar {
  margin: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  li {
    margin: 0 2rem;
  }
}

.pagination-text {
  font-size: 13px;
  color: var(--grey-500);
  min-width: 115px;

  &-pages {
    color: black;
  }
}

.page-size-select {
  --KButtonFontSize: var(--type-sm);
  color: var(--blue-400);
  font-weight: 500;
  line-height: 20px;
}

.pagination-button-container {
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;

  a {
    text-decoration: none !important;
    font-weight: initial;
    display: block;
  }

  .pagination-button {
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border-radius: 50% !important;
    line-height: 36px;
    font-weight: initial;
    color: var(--grey-500);
    border: 1px solid var(--grey-200);
    background-color: white;
    border-radius: 4px;
    margin: 0 6px;
    cursor: pointer;

    &.square {
      border: none;
    }

    &.placeholder {
      cursor: initial;
    }

    &:focus:not(.placeholder),
    &:hover:not(.placeholder) {
      color: var(--blue-500);
      border-color: var(--blue-500);
      border-radius: 4px;
    }
    &.disabled:focus:not(.placeholder),
    &.disabled:hover:not(.placeholder) {
      color: var(--black-45);
      border-color: var(--grey-200);
    }

    &.active {
      outline: none;
      color: var(--blue-500);
      border-color: var(--blue-200);
      border-radius: 4px;
      background-color: var(--blue-100);
    }
  }
}
</style>

<style lang="scss">
.page-size-select {
  .k-select-pop-button[x-placement^="top"] {
    margin-bottom: 2px;
  }
}
</style>

<style lang="sass">
a
    & .kong-icon
        width: 15px
        height: 15px
        border-radius: 50%
        &.kong-icon-arrowLeft
            background: no-repeat center/contain url('data:image/svg+xml,%3Csvg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0.345703 4.49609L4.14258 0.699219V3.8457H14.4434V5.14648H4.14258V8.29297L0.345703 4.49609Z" fill="black" fill-opacity="0.25"/%3E%3C/svg%3E%0A')

        &.kong-icon-arrowRight
            background: no-repeat center/contain url('data:image/svg+xml,%3Csvg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M14.6543 4.49609L10.8574 0.699219V3.8457H0.556641V5.14648H10.8574V8.29297L14.6543 4.49609Z" fill="%231456CB"/%3E%3C/svg%3E%0A')
</style>
