<template>
  <div class="row">
    <div class="col">
      {{ product.name }}
    </div>
    <div class="col">
      {{ product.amount }}
    </div>
    <div class="col">
      {{ product.price }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"]
};
</script>

<style></style>
