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
        product.amount
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
    <td class="text-right">{{ (product.price * product.amount) | money }}</td>
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
    this.inputAmount = this.product.amount;
  },
  methods: {
    changeAmountToggle() {
      this.changeAmount = !this.changeAmount;
      if (this.changeAmount) {
        this.$el.querySelector("input").focus();
      }
    },
    updateAmount() {
      this.changeAmountToggle();
      this.$store.commit("changeItemAmount", {
        id: this.product.id,
        amount: this.inputAmount
      });
    }
  }
};
</script>

<style scoped>
.amount {
  width: 100%;
  border: none;
  border-bottom: 1px solid black;
}
.amount:focus {
  outline: none;
}
</style>
