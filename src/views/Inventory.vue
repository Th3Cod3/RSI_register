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
        <template v-slot:cell(details)="data">
          <span v-if="data.item.dimensions">{{ data.item.dimensions }}</span>
          <span v-else>{{ data.item.bundle_volume | round }}</span>
        </template>
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
        key: "name",
        label: "Naam"
      },
      {
        key: "details",
        label: "Info"
      },
      {
        key: "barcode",
        label: "Barcode"
      },
      {
        key: "quantity",
        label: "Voorraad"
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
