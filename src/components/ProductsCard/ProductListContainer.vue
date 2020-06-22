<template>
  <b-row>
    <b-col v-if="!isLoading" cols="12">
      <item-detail v-for="item in items" :item="item" :key="item.id" />
    </b-col>
    <b-col v-else cols="12">
      <i class="fas fa-spinner fa-pulse"></i>
    </b-col>
  </b-row>
</template>

<script>
import ItemDetail from "@/components/ProductsCard/ItemDetail";
import apiService from "@/services/api-service.js";

const getProduct = (component, reset = false) => {
  component.page = reset ? 0 : component.page;
  let formData = new FormData();
  formData.append("page", component.page);
  formData.append("barcode", component.barcode);
  formData.append("name", component.productName);
  apiService
    .getProducts(formData)
    .then(data => {
      component.$store.commit("items", data);
    })
    .finally(() => {
      component.$store.commit("isLoading", false);
    });
};

export default {
  name: "ProductListContainer",
  data: () => ({
    page: 0
  }),
  components: {
    ItemDetail
  },
  computed: {
    items() {
      return this.$store.state.items;
    },
    productName() {
      return this.$store.state.productFilter.productName;
    },
    barcode() {
      return this.$store.state.productFilter.barcode;
    },
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  watch: {
    barcode() {
      getProduct(this, true);
    },
    productName() {
      getProduct(this, true);
    }
  },
  created() {
    getProduct(this);
  }
};
</script>
