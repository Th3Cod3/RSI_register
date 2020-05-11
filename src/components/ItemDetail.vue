<template>
  <div class="row">
    <div class="col">
      {{ item.product }}
    </div>
    <div class="col text-right">
      {{ item.barcode }}
    </div>
    <div class="col-2 text-right">
      {{ item.price | money }}
    </div>
    <div class="col-2 text-right">
      {{ item.discount }}
    </div>
    <div class="col-2">
      <div
        class="btn-group mr-2 float-right"
        role="group"
        aria-label="First group"
      >
        <button type="button" @click="addItem" class="btn btn-secondary">
          <i class="fas fa-plus fa-2x"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemDetail",
  props: ["item"],
  methods: {
    addItem() {
      this.$store.commit("addItemToCart", this.item);
    }
  }
};
</script>

<style scoped>
.row {
  padding-bottom: 0.25rem;
  padding-top: 0.25rem;
  border-radius: 0.25rem;
}
.row:nth-child(even) {
  background: #e7e7e7;
}
.row:nth-child(odd) {
  background: #ffffff;
}
.row:hover {
  background: #cfcfcf;
}
</style>
