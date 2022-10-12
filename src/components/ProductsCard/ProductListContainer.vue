<template>
  <b-row>
    <b-col v-if="!isLoading" cols="12">
      <table class="table table-sm">
        <thead class="thead-dark">
          <tr>
            <th class="text-nowrap">Description</th>
            <th class="text-right">Stock</th>
            <th class="text-nowrap text-right">New value</th>
            <th class="text-nowrap text-right">Market value</th>
            <th class="text-nowrap text-right">Sale price</th>
            <th class="text-right">Add</th>
          </tr>
        </thead>
        <item-detail v-for="item in products" :item="item" :key="item.id" :disabled="checkout" />
      </table>
    </b-col>
    <b-col v-else cols="12">
      <i class="fas fa-spinner fa-pulse"></i>
    </b-col>
  </b-row>
</template>

<script>
import ItemDetail from "@/components/ProductsCard/ItemDetail.vue";
import { mapState } from "vuex";

export default {
  name: "ProductListContainer",
  components: {
    ItemDetail
  },
  computed: {
    ...mapState("product", ["products", "isLoading"]),
    ...mapState("shop", ["checkout"])
  }
};
</script>
