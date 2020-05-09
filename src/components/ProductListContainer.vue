<template>
  <div class="row">
    <div class="col-12">
      <item-detail
        v-for="item in items"
        :item="item"
        :key="item.id"
        v-show="filterData(item)"
      />
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
    }
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
