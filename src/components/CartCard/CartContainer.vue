<template>
  <b-col lg="4" md="12">
    <b-card no-body class="body-height box-shadow">
      <b-card-header>
        Productlijst
        <span class="float-right d-print-none">
          <b-button-group>
            <b-button
              type="button"
              varient="danger"
              @click="clearCart"
              :disabled="!selectedItems.length || loading"
            >
              Clear
            </b-button>
          </b-button-group>
        </span>
      </b-card-header>
      <b-card-body class="cart-items-container">
        <div v-if="selectedItems.length">
          <table class="table table-sm">
            <thead class="thead-dark">
              <tr>
                <td>Omschrijving</td>
                <td class="d-print-table-cell d-none text-right">Shapprijs</td>
                <td class="d-print-table-cell d-none text-right">Korting</td>
                <td class="d-print-table-cell d-none text-right">
                  Verkoopprijs
                </td>
                <td class="text-right">Hoeveelheid</td>
                <td class="text-right">Totale verkoopprijs</td>
              </tr>
            </thead>
            <cart-detail
              v-for="item in selectedItems"
              :key="'c' + item.id"
              :product="item"
            />
          </table>
        </div>
        <div v-else>
          Empty
        </div>
      </b-card-body>
      <b-card-footer>
        <div class="row">
          <div class="col-12">
            <span class="float-left">
              <div class="form-group d-print-none">
                <label>Amount paid</label>
                <input
                  type="number"
                  class="form-control"
                  v-model="paidAmount"
                />
                <div class="d-print-block d-none">
                  Amount paid {{ paidAmount }}
                </div>
              </div>
            </span>
            <span class="float-right text-right total-summary">
              <span>Totaal {{ totalFullPrice | money }}</span>
              <br /><span> Korting {{ totalDiscount | money }}</span>
              <br /><span class="total">
                Eindtotaal {{ total | roundMoney }}</span
              >
              <br />
              <span class="d-print-none total"
                >Restitutie {{ change | roundMoney }}</span
              >
            </span>
          </div>
        </div>
        <button
          type="button"
          class="btn btn-success d-print-none btn-block"
          v-if="isLogin && !saved && selectedItems.length > 0"
          @click="saveInvoice"
          :disabled="loading"
        >
          Checkout
        </button>
        <div v-else-if="isLogin && saved" class="btn-group d-print-none">
          <button type="button" class="btn btn-primary" onclick="print()">
            Afdrukken
          </button>
        </div>
      </b-card-footer>
    </b-card>
  </b-col>
</template>

<script>
import CartDetail from "@/components/CartCard/CartDetail";
import { mapState } from "vuex";

export default {
  data: () => ({
    loading: false,
    paidAmount: 0,
    total: 0,
    totalFullPrice: 0,
    saved: false
  }),
  components: {
    CartDetail
  },
  computed: {
    ...mapState("user", ["isLogin"]),
    ...mapState("shop", ["selectedItems"]),
    ...mapState("inventory", {
      inventory_id: state => state.inventory.inventory_id
    }),
    change() {
      if (this.paidAmount < this.total) {
        return 0;
      }
      return this.paidAmount - this.total;
    },
    totalDiscount() {
      return this.totalFullPrice - this.total;
    }
  },
  watch: {
    selectedItems() {
      let total = 0;
      let totalFullPrice = 0;
      this.selectedItems.forEach(item => {
        let discount = (100 - item.discount) / 100;
        totalFullPrice += item.price * item.quantity;
        total += item.price * discount * item.quantity;
      });
      this.total = total;
      this.totalFullPrice = totalFullPrice;
    }
  },
  methods: {
    generateFormData() {
      let formData = new FormData();
      formData.set("total", this.total);
      formData.set("inventory_id", this.inventory_id);
      let count = 0;
      this.selectedItems.forEach(item => {
        formData.set(`items[${count}][item_id]`, item.id);
        formData.set(`items[${count}][quantity]`, item.quantity);
        formData.set(
          `items[${count}][price]`,
          item.price * ((100 - item.discount) / 100)
        );
        formData.set(`items[${count}][discount]`, item.discount);
        count++;
      });
      return formData;
    },
    saveInvoice() {
      this.loading = true;
      this.$store
        .dispatch("shop/submitCarShop", this.generateFormData())
        .then(response => {
          if (response.saved) {
            this.saved = true;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    clearCart() {
      this.$confirm("Are you sure you want to clear?", "Clear?", "warning", {
        confirmButtonText: "Yes"
      }).then(() => {
        this.saved = false;
        this.$store.commit("shop/RESTORE_CAR_SHOP");
      });
    }
  }
};
</script>

<style scoped>
.cart-items-container {
  overflow-y: auto;
}
</style>
