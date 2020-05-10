<template>
  <div class="col-lg-4 col-md-12">
    <div class="card cart-container box-shadow">
      <div class="card-header">
        Cart
        <span class="float-right d-print-none">
          <login-button />
        </span>
      </div>
      <div class="card-body cart-items-container">
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
      </div>
      <div class="card-footer">
        <div class="row">
          <div class="col-12">
            <span class="float-left">
              <div class="form-group d-print-none">
                <label>Amount paid</label>
                <input
                  type="number"
                  class="form-control"
                  @input="updatePaidAmount"
                  v-model="paidAmount"
                />
                <div class="d-print-block d-none">
                  Amount paid {{ paidAmount }}
                </div>
              </div>
            </span>
            <span class="float-right total text-right">
              Totaal {{ total | money }}
              <br />
              <span class="d-print-none">Restitutie {{ change | money }}</span>
            </span>
          </div>
        </div>
        <button type="button" class="btn btn-success d-print-none">
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CartDetail from "@/components/CartDetail";
import LoginButton from "@/components/LoginButton";

export default {
  data: () => ({
    loading: false,
    paidAmount: 0
  }),
  components: {
    CartDetail,
    LoginButton
  },
  computed: {
    items() {
      return this.$store.state.selectedItems;
    },
    total() {
      return this.$store.getters.total;
    },
    change() {
      return this.$store.getters.change;
    }
  },
  methods: {
    updatePaidAmount() {
      this.$store.commit("paidAmount", this.paidAmount);
    }
  }
};
</script>

<style scoped>
.total {
  font-size: 1.5rem;
  font-weight: 500;
}
.cart-container {
  max-height: 90vh;
}
.cart-items-container {
  overflow-y: auto;
}
</style>
