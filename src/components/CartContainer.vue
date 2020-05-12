<template>
  <div class="col-lg-4 col-md-12">
    <div class="card cart-container box-shadow">
      <div class="card-header">
        Productlijst
        <span class="float-right d-print-none">
          <div class="btn-group">
            <button type="button" class="btn btn-danger" @click="clearCart">
              Clear
            </button>
            <login-button />
          </div>
        </span>
      </div>
      <div class="card-body cart-items-container">
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
                <td class="text-right">Hoveelheid</td>
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
          v-if="successLogin && !saved && items.length > 0"
          @click="saveInvoice"
          :disabled="loading"
        >
          Checkout
        </button>
        <div v-else-if="successLogin && saved" class="btn-group d-print-none">
          <button type="button" class="btn btn-primary" onclick="print()">
            Afdrukken
          </button>
        </div>
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
    paidAmount: 0,
    saved: false
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
    totalFullPrice() {
      return this.$store.getters.totalFullPrice;
    },
    totalDiscount() {
      return this.$store.getters.totalDiscount;
    },
    successLogin() {
      return this.$store.state.successLogin;
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
      formData.set("token", this.$store.state.login.token);
      formData.set("user", this.$store.state.login.user);
      formData.set("total", this.$store.state.totalAmount);
      let count = 0;
      this.items.forEach(item => {
        formData.set(`items[${count}][item_id]`, item.id);
        formData.set(`items[${count}][amount]`, item.amount);
        count++;
      });
      fetch("https://rip.rsiaruba.com/api/invoice", {
        method: "POST",
        body: formData
      })
        .then(response => response.json())
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
      this.saved = false;
      this.$store.commit("restoreInvoice");
    }
  }
};
</script>

<style scoped>
.total {
  font-weight: 500;
  font-size: 1.5rem;
}
.total-summary {
  font-size: 1.25rem;
}
.cart-container {
  max-height: 90vh;
}
.cart-items-container {
  overflow-y: auto;
}
</style>
