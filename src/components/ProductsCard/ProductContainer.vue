<template>
  <div class="col-lg-8 col-md-12 d-print-none">
    <div class="card product-container box-shadow">
      <div class="card-header">
        <search-menu />
      </div>
      <div class="card-body product-list-container">
        <product-list-container />
      </div>
    </div>
  </div>
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
