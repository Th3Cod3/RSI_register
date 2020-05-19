<template>
  <b-col md="12" lg="8" class="d-print-none">
    <b-card no-body class="product-container box-shadow">
      <b-card-header>
        <search-menu />
      </b-card-header>
      <b-card-body class="product-list-container">
        <product-list-container />
      </b-card-body>
    </b-card>
  </b-col>
</template>

<script>
import SearchMenu from "@/components/ProductsCard/SearchMenu";
import ProductListContainer from "@/components/ProductsCard/ProductListContainer";

export default {
  name: "ProductContainer",
  components: {
    SearchMenu,
    ProductListContainer
  }
};
</script>

<style scoped>
.product-container {
  height: 90vh;
}
.product-list-container {
  overflow: auto;
}
</style>
