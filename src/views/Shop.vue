<template>
  <div>
    <print-invoice-header />
    <b-row>
      <product-container />
      <cart-container />
    </b-row>
  </div>
</template>

<script>
import ProductContainer from "@/components/ProductsCard/ProductContainer";
import CartContainer from "@/components/CartCard/CartContainer";
import PrintInvoiceHeader from "@/components/Header/PrintInvoiceHeader";

export default {
  name: "Shop",
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
    CartContainer,
    PrintInvoiceHeader
  }
};
</script>

<style>
.container-fluid {
  margin-top: 2rem;
}
</style>
