<template>
  <tr>
    <th class="text-nowrap">Description</th>
    <th class="text-right">Qty.</th>
    <th
      class="text-nowrap text-right"
      :class="{ 'd-none': isCartMode, 'd-print-table-cell': isCartMode }"
    >
      Unit
    </th>
    <th
      class="text-nowrap text-right"
      :class="{ 'd-none': isCartMode, 'd-print-table-cell': isCartMode }"
    >
      Price per unit
    </th>
    <th class="text-right">Subtotal</th>
  </tr>
</template>

<script>
export default {
  props: {
    mode: String
  },
  computed: {
    isCartMode() {
      return this.mode == "cart";
    },
    isInvoiceMode() {
      return this.mode == "invoice";
    }
  }
};
</script>
