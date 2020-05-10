<template>
  <div class="row">
    <div class="col">
      {{ product.product }}
    </div>
    <div
      :class="{
        'col-2': changeAmount,
        'col-4': !changeAmount,
        'text-right': true
      }"
    >
      <span v-show="!changeAmount" @click="changeAmountToggle">
        {{ product.amount }}
      </span>
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
    </div>
    <div class="col-3 text-right">
      {{ product.price | money }}
    </div>
  </div>
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
