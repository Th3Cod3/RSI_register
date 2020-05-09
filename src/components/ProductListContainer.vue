<template>
  <div class="row">
    <div v-if="!loadingItems" class="col-12">
      <item-detail
        v-for="item in items"
        :item="item"
        :key="item.id"
        v-show="filterData(item)"
      />
    </div>
    <div v-else class="col-12">
      <i class="fas fa-spinner fa-pulse"></i>
    </div>
  </div>
</template>

<script>
import ItemDetail from "@/components/ItemDetail";

export default {
  name: "ProductListContainer",
  components: {
    ItemDetail
  },
  computed: {
    items() {
      return this.$store.state.items;
    },
    filter() {
      return this.$store.state.filter;
    },
    loadingItems() {
      return this.$store.state.loadingItems;
    }
  },
  created() {
    fetch("https://rip.rsiaruba.com/api/sales")
      .then(response => response.json())
      .then(data => {
        this.$store.commit("items", data);
      })
      .finally(() => {
        this.$store.commit("loadingItems", false);
      });
  },
  methods: {
    filterData(item) {
      let result = false;
      if (
        (this.filter.productName === "" ||
          item.product
            .toLowerCase()
            .match(this.filter.productName.toLowerCase())) &&
        (this.filter.barcode === "" ||
          item.barcode.toLowerCase().match(this.filter.barcode.toLowerCase()))
      ) {
        result = true;
      }

      return result;
    }
  }
};
</script>
