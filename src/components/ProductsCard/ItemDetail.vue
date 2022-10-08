<template>
  <b-row>
    <b-col>
      {{ item.name }}
    </b-col>
    <b-col>
      {{ item.barcode }}
    </b-col>
    <b-col cols="2" class="text-right">
      {{ item.price | money }}
    </b-col>
    <b-col cols="2">
      {{ item.discount }}
    </b-col>
    <b-col cols="2">
      <b-button-group class="mr-2 float-right">
        <b-button
          variant="primary"
          type="button"
          @click="addItem"
          :disabled="disabled"
        >
          <i class="fas fa-plus fa-2x"></i>
        </b-button>
      </b-button-group>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "ItemDetail",
  props: ["item", "disabled"],
  methods: {
    addItem() {
      this.$store.commit("shop/ADD_ITEM", this.item);
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
