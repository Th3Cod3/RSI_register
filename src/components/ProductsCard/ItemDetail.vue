<template>
  <tr>
    <td style="font-size: 0.8rem;">
      <table class="table table-sm table-borderless m-0" style="line-height: 1rem;">
        <tr class="sub-description" v-if="item.barcode">
          <td class="text-nowrap text-left" style="width: 140px;">Product code:</td>
          <td class="text-left">{{ item.barcode }}</td>
        </tr>
        <tr class="sub-description" v-if="item.sub_category">
          <td class="text-nowrap text-left" style="width: 140px;">Product type:</td>
          <td class="text-left">{{ item.sub_category }}</td>
        </tr>
        <tr class="sub-description" v-if="item.name">
          <td class="text-nowrap text-left" style="width: 140px;">Product description:</td>
          <td class="text-left">{{ item.name }}</td>
        </tr>
        <tr class="sub-description" v-if="item.dimensions_text">
          <td class="text-nowrap text-left" style="width: 140px;">Additional information:</td>
          <td class="text-left">{{ item.dimensions_text }}</td>
        </tr>
      </table>
    </td>
    <td class="text-right text-nowrap">
      {{ item.quantity }}
    </td>
    <td class="text-right text-nowrap">
      {{ item.price_as_new | money }}
    </td>
    <td class="text-right text-nowrap">
      <span v-if="item.depreciation">
        <small class="text-secondary">({{parseInt(item.depreciation)}}%)</small>
        {{ ( item.price_as_new * (1 - item.depreciation / 100)) | money }}
      </span>
    </td>
    <td class="text-right text-nowrap">
      <span>
        <small class="text-secondary" v-if="item.liquidation">({{parseInt(item.liquidation)}}%)</small>
        {{ item.price | money }}
      </span>
    </td>
    <td class="text-right text-nowrap">
      <b-button variant="primary" type="button" @click="addItem" :disabled="disabled">
        <i class="fas fa-plus fa-2x"></i>
      </b-button>
    </td>
  </tr>
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
.tr {
  padding-bottom: 0.25rem;
  padding-top: 0.25rem;
  border-radius: 0.25rem;
}

.tr:nth-child(even) {
  background: #e7e7e7;
}

.tr:nth-child(odd) {
  background: #ffffff;
}

.tr:hover {
  background: #cfcfcf;
}

.sub-description>td:first-child {
  width: 185px;
}

.sub-description>td {
  padding: 0;
}
</style>
