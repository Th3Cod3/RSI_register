<template>
  <div class="container-fluid">
    <div class="d-print-block d-none">
      <div>
        <img
          src="https://rsiaruba.com/rsi_logo.png"
          alt="Logo RSI"
          class="logo"
        />
      </div>
      <div class="invoice-info">
        <span>{{ invoiceNumber }}</span>
        <span class="float-right">{{ date }}</span>
      </div>
    </div>
    <div class="row">
      <product-container />
      <cart-container />
    </div>
  </div>
</template>

<script>
import ProductContainer from "@/components/ProductContainer";
import CartContainer from "@/components/CartContainer";

export default {
  name: "App",
  computed: {
    invoiceNumber() {
      return this.$store.state.invoiceInfo.invoiceNumber;
    },
    date() {
      return this.$store.state.invoiceInfo.date;
    }
  },
  components: {
    ProductContainer,
    CartContainer
  }
};
</script>

<style>
.container-fluid {
  margin-top: 2rem;
}

.box-shadow {
  box-shadow: 0 0 8px 3px #b3b3b3;
}

.logo {
  width: 250px;
}

.invoice-info {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>
