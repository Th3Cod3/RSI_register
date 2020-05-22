<template>
  <b-row>
    <b-col xl="3" md="6" sm="12">
      <b-form-group label="Product name">
        <input
          @input="sendData"
          type="text"
          class="form-control"
          v-model="productName"
        />
      </b-form-group>
    </b-col>
    <b-col xl="3" md="6" sm="12">
      <b-form-group label="Barcode" label-for="barcode">
        <b-form-input
          @input="sendData"
          type="text"
          id="barcode"
          class="form-control"
          v-model="barcode"
        />
      </b-form-group>
    </b-col>
    <b-col>
      <b-button
        variant="outline-secondary"
        class="float-right"
        @click="clearSearch"
        @touch="clearSearch"
      >
        <i class="far fa-times-circle fa-2x"></i>
      </b-button>
      <b-button
        variant="outline-secondary"
        class="float-right mx-2"
        @click="removeBarcodeSides"
        @touch="removeBarcodeSides"
      >
        <i class="fas fa-barcode fa-2x"></i>
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "SearchMenu",
  data: () => ({
    productName: "",
    barcode: ""
  }),
  methods: {
    sendData() {
      this.$store.commit("filter", {
        productName: this.productName,
        barcode: this.barcode
      });
    },
    clearSearch() {
      this.productName = "";
      this.barcode = "";
      this.$el.querySelector("input#barcode").focus();
      this.$store.commit("clearSearch");
    },
    removeBarcodeSides() {
      this.barcode = this.barcode.substring(this.barcode.length - 1, 1);
      this.$store.commit("filterBarcode", this.barcode);
    }
  }
};
</script>
