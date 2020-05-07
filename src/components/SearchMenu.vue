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
      this.$emit("send-data", {
        productName: this.productName,
        barcode: this.barcode
      });
    }
  }
};
</script>
