<template>
  <div class="col-md-4 col-sm-12">
    <div class="card">
      <div class="card-header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Planetshakers.png"
        />
      </div>
      <div class="card-body">
        <div v-if="items.length">
          <cart-detail
            v-for="item in items"
            :key="'c' + item.id"
            :product="item"
          />
        </div>
        <div v-else>
          Empty
        </div>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CartDetail from "@/components/CartDetail";
export default {
  data: () => ({
    items: [],
    loading: false
  }),
  components: {
    CartDetail
  }
};
</script>

<style></style>
