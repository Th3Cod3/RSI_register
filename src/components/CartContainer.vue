<template>
  <div class="col-md-4 col-sm-12">
    <div class="card">
      <div class="card-header">
        Cart
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
      </div>
      <div class="card-footer">
        <div class="row">
          <div class="col-12">
            <span class="float-left">
              <div class="form-group">
                <label>Amount paid</label>
                <input
                  type="number"
                  class="form-control"
                  @input="updatePaidAmount"
                  v-model="paidAmount"
                />
              </div>
            </span>
            <span class="float-right total text-right">
              Totaal {{ total | money }}
              <br />
              Restitutie {{ change | money }}
            </span>
          </div>
        </div>
        <button type="button" class="btn btn-primary">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import CartDetail from "@/components/CartDetail";
export default {
  data: () => ({
    loading: false,
    paidAmount: 0
  }),
  components: {
    CartDetail
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
</style>
