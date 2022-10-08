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
      {{ priceEach | money }}
    </td>
    <td class="text-right">
      <span v-show="!changeAmount" @click="changeAmount = true">{{
        product.quantity
      }}</span>
      <span v-show="changeAmount">
        <div class="d-print-none">
          <input
            type="number"
            id="cart-item-amount"
            @blur="updateAmount"
            @keydown.enter="updateAmount"
            @keydown.esc="changeAmount = false"
            v-model="inputAmount"
          />
        </div>
      </span>
    </td>
    <td class="text-right">
      <span v-show="!changePrice" @click="changePrice = true">{{
        salePrice | money
      }}</span>
      <span v-show="changePrice">
        <div class="d-print-none">
          <input
            type="number"
            id="cart-item-price"
            @blur="updatePrice"
            @keydown.enter="updatePrice"
            @keydown.esc="changePrice = false"
            v-model="inputPrice"
          />
        </div>
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["product"],
  data: () => ({
    changeAmount: false,
    changePrice: false,
    inputAmount: 0,
    inputPrice: 0
  }),
  computed: {
    discount() {
      return this.product.discount / 100;
    },
    priceEach() {
      return this.product.price - this.discount * this.product.price;
    },
    discountPrice() {
      return this.product.price - this.priceEach;
    },
    salePrice() {
      return this.product.quantity * this.priceEach;
    }
  },
  watch: {
    changeAmount(value, oldValue) {
      if (value && !oldValue) {
        this.inputAmount = this.product.quantity;
        setTimeout(() => {
          this.$el.querySelector("#cart-item-amount").focus();
        }, 0);
      }
    },
    changePrice(value, oldValue) {
      if (value && !oldValue) {
        this.inputPrice = this.salePrice.toFixed(4);
        setTimeout(() => {
          this.$el.querySelector("#cart-item-price").focus();
        }, 0);
      }
    }
  },
  methods: {
    updateAmount() {
      if (this.changeAmount) {
        this.changeAmount = false;
        this.$store.commit("shop/CHANGE_QUANTITY", {
          id: this.product.id,
          quantity: this.inputAmount
        });
      }
    },
    updatePrice() {
      if (this.changePrice) {
        this.changePrice = false;
        this.$store.commit("shop/CHANGE_FIXED_PRICE", {
          id: this.product.id,
          price: this.inputPrice / this.product.quantity
        });
      }
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
