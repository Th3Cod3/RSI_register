<template>
  <b-card no-body class="body-height box-shadow">
    <b-card-header>
      <search-menu :shop="false" />
    </b-card-header>
    <b-card-body>
      <b-table
        striped
        hover
        sticky-header="70vh"
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
    <add-product />
  </b-card>
</template>

<script>
import apiService from "@/services/api-service.js";
import SearchMenu from "@/components/ProductsCard/SearchMenu";
import AddProduct from "@/components/Products/AddProduct";

const getProducts = (component, reset = false) => {
  component.page = reset ? 0 : component.page;
  let formData = new FormData();
  formData.set("extra-info", true);
  formData.set("order", "created_at_desc");
  formData.set("page", component.page);
  formData.set("barcode", component.barcode);
  formData.set("name", component.productName);
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
  components: {
    SearchMenu,
    AddProduct
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
    products() {
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
  created() {
    getProducts(this);
  },
  watch: {
    barcode() {
      getProducts(this, true);
    },
    productName() {
      getProducts(this, true);
    }
  },
  methods: {
    filterMoney(value) {
      return this.$options.filters.money(value);
    },
    selectProduct(product) {
      this.$router.push({ name: "product", params: { id: product.id } });
    }
  }
};
</script>
