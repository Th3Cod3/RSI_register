<template>
  <b-card no-body class="body-height box-shadow">
    <b-card-header>
      <product-filter :shop="false" order="created_at_desc" extraInfo />
    </b-card-header>
    <b-card-body>
      <b-table
        hover
        sticky-header="70vh"
        :busy="isLoading"
        :fields="fields"
        :items="products"
        @row-clicked="selectProduct"
      >
      </b-table>
    </b-card-body>
  </b-card>
</template>

<script>
import { mapState } from "vuex";
import ProductFilter from "@/components/ProductsCard/ProductFilter.vue";

export default {
  components: {
    ProductFilter
  },
  data: () => ({
    page: 0,
    fields: [
      {
        key: "meta_data.item_no",
        label: "No"
      },
      {
        key: "barcode",
        label: "Barcode"
      },
      {
        key: "sub_category",
        label: "Category"
      },
      {
        key: "name",
        label: "Naam"
      },
      {
        key: "dimensions_text",
        label: "Dimensions"
      },
      {
        key: "discount",
        label: "Discount"
      },
      {
        key: "quantity",
        label: "Stock"
      },
      {
        key: "price",
        label: "Price"
      }
    ]
  }),
  computed: {
    ...mapState("product", ["products", "isLoading"])
  },
  methods: {
    selectProduct(product) {
      this.$router.push({ name: "product", params: { id: product.id } });
    }
  }
};
</script>
