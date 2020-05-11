<template>
  <div class="row">
    <div class="col-xl-3 col-md-6 col-sm-12">
      <div class="form-group">
        <label>Product name</label>
        <input
          @input="sendData"
          type="text"
          class="form-control"
          v-model="productName"
        />
      </div>
    </div>
    <div class="col-xl-3 col-md-6 col-sm-12">
      <div class="form-group">
        <label>Barcode</label>
        <input
          @input="sendData"
          type="text"
          class="form-control"
          v-model="barcode"
        />
      </div>
    </div>
    <div class="col">
      <button class="float-right" @click="clearSearch" @touch="clearSearch">
        <i class="far fa-times-circle fa-2x"></i>
      </button>
      <button
        class="float-right mx-2"
        @click="removeBarcodeSides"
        @touch="removeBarcodeSides"
      >
        <i class="fas fa-barcode fa-2x"></i>
      </button>
    </div>
  </div>
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
      this.$store.commit("clearSearch");
    },
    removeBarcodeSides() {
      debugger; // eslint-disable-line
      this.barcode = this.barcode.substring(this.barcode.length - 1, 1);
      this.$store.commit("filterBarcode", this.barcode);
    }
  }
};
</script>
