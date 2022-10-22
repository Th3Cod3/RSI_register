<template>
  <div>
    <PrintInvoiceHeader mode="cart" />
    <b-row>
      <ProductContainer />
      <CartContainer mode="cart" />
    </b-row>
  </div>
</template>

<script>
import ProductContainer from "@/components/ProductsCard/ProductContainer.vue";
import CartContainer from "@/components/CartCard/CartContainer.vue";
import PrintInvoiceHeader from "@/components/Header/PrintInvoiceHeader.vue";

export default {
  name: "Shop",
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
