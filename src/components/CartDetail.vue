<template>
  <div class="row">
    <div class="col">
      {{ product.product }}
    </div>
    <div class="col-2">
      {{ product.amount }}
    </div>
    <div class="col-3">
      {{ product.price | money }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"]
};
</script>

<style></style>
