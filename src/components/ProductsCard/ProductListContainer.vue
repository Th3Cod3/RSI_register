<template>
  <b-row>
    <b-col v-if="!loadingItems" cols="12">
      <item-detail
        v-for="item in items"
        :item="item"
        :key="item.id"
        v-show="filterData(item)"
      />
    </b-col>
    <b-col v-else cols="12">
      <i class="fas fa-spinner fa-pulse"></i>
    </b-col>
  </b-row>
</template>

<script>
import ItemDetail from "@/components/ProductsCard/ItemDetail";

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
          item.name
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
