<template>
  <b-row>
    <b-col v-if="!isLoading" cols="12">
      <item-detail v-for="item in products" :item="item" :key="item.id" />
    </b-col>
    <b-col v-else cols="12">
      <i class="fas fa-spinner fa-pulse"></i>
    </b-col>
  </b-row>
</template>

<script>
import ItemDetail from "@/components/ProductsCard/ItemDetail";
import { mapState } from "vuex";

export default {
  name: "ProductListContainer",
  components: {
    ItemDetail
  },
  computed: {
    ...mapState("product", ["products", "isLoading"])
  }
};
</script>
