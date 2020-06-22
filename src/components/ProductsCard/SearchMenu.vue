<template>
  <b-row>
    <b-col xl="3" md="6" sm="12">
      <b-form-group label="Product name">
        <input type="text" class="form-control" v-model="productName" />
      </b-form-group>
    </b-col>
    <b-col xl="3" md="6" sm="12">
      <b-form-group label="Barcode">
        <b-form-input type="text" class="form-control" v-model="barcode" />
      </b-form-group>
    </b-col>
    <b-col v-if="shop">
      <div class="float-right">
        <b-button variant="outline-secondary" @click="clearSearch">
          <i class="far fa-times-circle fa-2x"></i>
        </b-button>
        <b-button
          variant="outline-secondary"
          class="mx-2"
          @click="removeBarcodeSides"
        >
          <i class="fas fa-barcode fa-2x"></i>
        </b-button>
      </div>
    </b-col>
    <b-col v-else>
      <div class="float-right">
        <b-button variant="success" @click="createProduct">
          <i class="fas fa-plus fa-2x"></i>
        </b-button>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    shop: {
      type: Boolean,
      default: true
    }
  },
  name: "SearchMenu",
  computed: {
    productName: {
      get() {
        return this.$store.state.productFilter.productName;
      },
      set(value) {
        this.$store.commit("productFilter_productName", value);
      }
    },
    barcode: {
      get() {
        return this.$store.state.productFilter.barcode;
      },
      set(value) {
        this.$store.commit("productFilter_barcode", value);
      }
    }
  },
  methods: {
    clearSearch() {
      this.productName = "";
      this.barcode = "";
    },
    removeBarcodeSides() {
      this.barcode = this.barcode.substring(this.barcode.length - 1, 1);
    },
    createProduct() {
      this.$store.commit("openModal", "add-product");
    }
  }
};
</script>
