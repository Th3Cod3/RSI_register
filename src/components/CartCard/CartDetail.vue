<template>
  <tr>
    <td>{{ product.name }}</td>
    <td class="text-right d-none d-print-table-cell">
      {{ product.price | money }}
    </td>
    <td class="text-right d-none d-print-table-cell">
      {{ product.discount }}%
    </td>
    <td class="text-right d-none d-print-table-cell">
      {{ -((product.discount / 100) * product.price - product.price) | money }}
    </td>
    <td class="text-right">
      <span v-show="!changeAmount" @click="changeAmountToggle">{{
        product.quantity
      }}</span>
      <span v-show="changeAmount">
        <div class="d-print-none">
          <input
            type="number"
            class="amount"
            @blur="updateAmount"
            v-model="inputAmount"
          />
        </div>
      </span>
    </td>
    <td class="text-right">
      {{
        (product.quantity *
          (product.price - (product.discount / 100) * product.price))
          | money
      }}
    </td>
  </tr>
</template>

<script>
export default {
  props: ["product"],
  data: () => ({
    changeAmount: false,
    inputAmount: 0
  }),
  created() {
    this.inputAmount = this.product.quantity;
  },
  methods: {
    changeAmountToggle() {
      this.changeAmount = !this.changeAmount;
      if (this.changeAmount) {
        setTimeout(() => {
          this.$el.querySelector("input").focus();
        }, 0);
      }
    },
    updateAmount() {
      this.changeAmountToggle();
      this.$store.commit("changeItemQuantity", {
        id: this.product.id,
        quantity: this.inputAmount
      });
    }
  }
};
</script>

<style scoped>
.quantity {
  width: 100%;
  border: none;
  border-bottom: 1px solid black;
}
.quantity:focus {
  outline: none;
}
</style>
