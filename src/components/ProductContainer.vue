<template>
  <div class="col-md-8 col-sm-12">
    <div class="card">
      <div class="card-header">
        <search-menu @send-data="receiveData" />
      </div>
      <div class="card-body">
        <product-list-container :filter="filter" />
      </div>
    </div>
  </div>
</template>

<script>
import SearchMenu from "@/components/SearchMenu";
import ProductListContainer from "@/components/ProductListContainer";

export default {
  name: "ProductContainer",
  data: () => ({
    filter: {
      productName: "",
      barcode: ""
    }
  }),
  components: {
    SearchMenu,
    ProductListContainer
  },
  methods: {
    receiveData(data) {
      this.filter = data;
    }
  }
};
</script>
