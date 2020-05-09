<template>
  <div class="row">
    <div class="col">
      {{ item.product }}
    </div>
    <div class="col">
      {{ item.barcode }}
    </div>
    <div class="col">
      {{ item.section }}
    </div>
    <div class="col">
      <div
        class="btn-group mr-2 float-right"
        role="group"
        aria-label="First group"
      >
        <button type="button" @click="addItem" class="btn btn-secondary">
          <i class="fas fa-plus"></i>
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
