<template>
  <b-col md="12" lg="8" class="d-print-none">
    <b-card no-body class="body-height box-shadow">
      <b-card-header>
        <product-filter />
      </b-card-header>
      <b-card-body class="product-list-container">
        <product-list-container />
      </b-card-body>
    </b-card>
  </b-col>
</template>

<script>
import ProductFilter from "@/components/ProductsCard/ProductFilter";
import ProductListContainer from "@/components/ProductsCard/ProductListContainer";

export default {
  name: "ProductContainer",
  components: {
    ProductFilter,
    ProductListContainer
  }
};
</script>

<style scoped>
.product-list-container {
  overflow: auto;
}
</style>
