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
              :disabled="!items.length || loading"
            >
              Clear
            </b-button>
          </b-button-group>
        </span>
      </b-card-header>
      <b-card-body class="cart-items-container">
        <div v-if="items.length">
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
              v-for="item in items"
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
                  @input="updatePaidAmount"
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
          v-if="isLogin && !saved && items.length > 0"
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
import apiService from "@/services/api-service.js";

export default {
  data: () => ({
    loading: false,
    paidAmount: 0,
    saved: false
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
    totalFullPrice() {
      return this.$store.getters.totalFullPrice;
    },
    totalDiscount() {
      return this.$store.getters.totalDiscount;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
    change() {
      return this.$store.getters.change;
    }
  },
  methods: {
    updatePaidAmount() {
      this.$store.commit("paidAmount", this.paidAmount);
    },
    saveInvoice() {
      this.loading = true;
      let formData = new FormData();
      formData.set("total", this.$store.getters.total);
      let count = 0;
      this.items.forEach(item => {
        formData.set(`items[${count}][item_id]`, item.id);
        formData.set(`items[${count}][quantity]`, item.quantity);
        formData.set(
          `items[${count}][price]`,
          item.price * ((100 - item.discount) / 100)
        );
        formData.set(`items[${count}][discount]`, item.discount);
        count++;
      });
      apiService
        .createInvoices(formData)
        .then(data => {
          if (data.invoice_number) {
            this.saved = true;
            this.$store.commit("invoiceInfo", {
              invoiceNumber: data.invoice_number,
              date: data.date
            });
          } else {
            alert("fail");
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
        this.$store.commit("restoreInvoice");
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
