<template>
  <div class="col-md-8 col-sm-12">
    <div class="card">
      <div class="card-header">
        <search-menu />
      </div>
      <div class="card-body">
        <product-list-container />
      </div>
    </div>
  </div>
</template>

<script>
import SearchMenu from "@/components/SearchMenu";
import ProductListContainer from "@/components/ProductListContainer";

export default {
  name: "ProductContainer",
  components: {
    SearchMenu,
    ProductListContainer
  }
};
</script>
