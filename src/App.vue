<template>
  <div class="container-fluid">
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
</style>
